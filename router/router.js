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
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

router.post("/prices/btc", async (request, response) => {
  let { date, page, limit } = request.query;
  const { max, min, email } = request.body;

  let fetchdata;

  clearInterval(fetchdata);

  fetchdata = setInterval(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`
      )
      .then(({ data }) => {
        let curr_val = data[0].current_price;
        const price = new Modal({ price: curr_val, coin: "btc", email });
        price.save();
        sendreq(curr_val);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 10 * 1000);

  const sendreq = (val) => {
    console.log("functioncall");
    const content = `<div>
    <h3>Hey there, {{Email}} </h3>
    <p>The price value of Bitcoin(BTC) in USD goes {{up_down}} by {{diff}}</p>
    <p>Current value: {{current}}</p>
  </div>`;
    const template = hbs.compile(content);
    if (val > max) {

      transport.sendMail({
        from: process.env.FROM,
        to: email,
        subject: "Bitcoin price update",
        html: template({ Email: email, up_down: "Up", diff: val - max, current:val }),
      });
    } else if (val < min) {

      transport.sendMail({
        from: process.env.FROM,
        to: email,
        subject: "Bitcoin price update",
        html: template({ Email: email, up_down: "down", diff: min - val, current:val }),
      });
    }
  };

  if (page == undefined) {
    page = 1;
  }

  let count = await Modal.find({ email }).length; 

  let data = await Modal.find({ email })
    .skip((page - 1) * limit)
    .limit(page * limit);
  response.status(200).send({ data, count });
});

module.exports = router;
