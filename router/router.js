const { Router } = require("express");
const hbs = require("handlebars");
const nodemailer = require("nodemailer");
const router = Router();
const axios = require("axios");
const Modal = require("../modal/model");
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
  const { date, offset, limit } = request.query;
  const { max, min,email } = request.body;
  
  console.log(date, offset, limit,max, min,email);
  let curr_val;

  setInterval(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}`
      )
      .then(async({ data }) => {
        // console.log(data);0
        curr_val = data.market_data.current_price.usd;
        const price = new Modal({price:curr_val, coin:"btc"})
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

  if (4000 > max) {
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

  if(offset==undefined){
    offset=0
  }

  let data = await Modal.find().skip(offset).limit(offset+limit)
  response.status(200).send(data)
});


module.exports = router;
