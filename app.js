require("dotenv").config();

const express = require("express");
const app = express();

const ProductModel = require("./models/ProductModel");

const productModel = new ProductModel();

// middleware
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.get("/products", async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    console.log("PRODUCTS", products);
    res.json(products);
  } catch (error) {
    console.log("ERROR");
    res.status(500).send("Error fetching the products");
  }
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
