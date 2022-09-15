const mongoose = require("mongoose");
require("dotenv/config");

const urlLocaldatabase = process.env.LOCAL_DATABASE_URL; //getting the url from the .env file

const connection = mongoose //connectin the server with the database
  .connect(urlLocaldatabase, {
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
