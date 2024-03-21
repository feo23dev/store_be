require("dotenv").config();

const express = require("express");
const app = express();
// const data = require("../products");
// const dumper = require("./db/dump");
// const populateDatabase = require("./db/dump");
app.use(express.json());

const productRoute = require("./routes/productRoute");

// middleware

const port = process.env.PORT;

//

app.use("/api/v1/products", productRoute);

app.get("/api/v1", (req, res) => {
  res.send("<h1>Welcome To The Q-Store</h1>");
});
const start = async () => {
  try {
    app.listen(port, (req, res) => {
      console.log("Started listening");
    });
  } catch (error) {
    console.log("Error starting the server", error);
  }
};
start();

// setTimeout(() => {
//   populateDatabase(data);
// }, 5000);
