require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const productRoute = require("./routers/productRoute");

// middleware

const port = process.env.PORT;

//

app.get("/api/v1", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.use("/api/v1/products", productRoute);

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
