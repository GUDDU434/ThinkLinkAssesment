const express = require("express");
const connection = require("./databaseComponent/dataBase");
const router = require("./router/router");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to api server");
});

app.use("/api", router);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connection;
  console.log("app Started on port 8080");
});
