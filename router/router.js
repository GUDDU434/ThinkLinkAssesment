const { Router } = require("express");
const hbs = require("handlebars");
const nodemailer = require("nodemailer");
const router = Router();
const axios = require("axios");
const cryptoPriceModel = require("../modal/model");
require("dotenv/config");

const HOST = process.env.HOST; //getting the url from the .env file
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const transport = nodemailer.createTransport({
  host: HOST,
  port: 2525,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

router.post("/prices/btc", async (request, response) => {
  const { date, page, limit } = request.query;
  const { max, min,email } = req.body;
  
  console.log(date, offset, limit);
  let curr_val;

  setInterval(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}`
      )
      .then(({ data }) => {
        console.log(data);
        curr_val = data.market_data.current_price.usd;
        const price = new cryptoPriceModel({price:curr_val, coin:"btc"})
        await price.save()

      })
      .catch((err) => console.log(err));
  }, 10 * 1000);

  const content = `<div>
    <h3>Hey there, {{Email}} </h3>
    <p>The price value of Bitcoin(BTC) in USD goes {{up_down}} by {{diff}}</p>
    <p>Current value: {{current}}</p>
  </div>`;
  const template = hbs.compile(content);

  if (curr_val > max) {
    transport.sendMail({
      from: "example.mailtrap.io",
      to: email,
      subject: "Bitcoin price update",
      html: template({ Email: email, up_down: "Up", diff: curr_val - max }),
    });
  } else if (curr_val < min) {
    transport.sendMail({
      from: "example.mailtrap.io",
      to: email,
      subject: "Bitcoin price update",
      html: template({ Email: email, up_down: "down", diff: min - curr_val }),
    });
  }

  if(page==undefined){
    page=1
  }

  let data = await cryptoPriceModel.find().skip((page-1)*100).limit(page*100)
  response.status(200).send(data)
});

module.exports = router;
