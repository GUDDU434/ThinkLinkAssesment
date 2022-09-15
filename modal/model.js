const { Schema } = require("mongoose");

const cryptoPrice = new Schema({
  price:Number,
  coin:String
},{timestamps:true});

const cryptoPriceModel = ("price", cryptoPrice);

module.exports = cryptoPriceModel;
