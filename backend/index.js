const express = require("express");

const {connection} = require("./db");
var cors = require("cors");
const {bookRoute} = require("./route/book.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/book", bookRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(7500, async () => {
  try {
    await connection;
    console.log("connected to db")
    console.log("server is running on port 7500");
  } catch (error) {
    console.log("DB is Disconnected");
  }
});