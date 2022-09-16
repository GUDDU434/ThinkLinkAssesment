const { Schema, model } = require("mongoose");

const cryptoPrice = new Schema(
  {
    price: Number,
    coin: String,
  },
  { timestamps: true }
);

const Modal = model("price", cryptoPrice);

module.exports = Modal;
