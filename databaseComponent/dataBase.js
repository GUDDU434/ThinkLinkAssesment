const mongoose = require("mongoose");

const connection = mongoose //connectin the server with the database
  .connect("mongodb://localhost:27017/cryptoPriceTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    // if there is any error while connectin to the database console it in log
    console.log(err);
  });

module.exports = connection;
