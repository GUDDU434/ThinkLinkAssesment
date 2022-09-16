const { Schema, model } = require("mongoose");

const cryptoPrice = new Schema(
  {
    email:String,
    price: Number,
    coin: String,
  },
  { timestamps: true }
);

const Modal = model("price", cryptoPrice);

module.exports = Modal;
