require("dotenv").config();
console.log(process.env);

const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// middleware
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

const start = async () => {
  try {
    app.listen(port, (req, res) => {
      console.log("Started listenin");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
