require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./db/database");

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log(dbConfig);

// DATABASE CONNECTION
const database = new db(dbConfig);

const result = database.query("SELECT * FROM products");
console.log(result);

// middleware
app.use(express.json());
const port = process.env.PORT;

console.log("DB", database);
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

const start = async () => {
  try {
    app.listen(port, (req, res) => {
      console.log("Started listenin");
    });
  } catch (error) {}
};
start();
