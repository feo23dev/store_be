const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();
const productController = new ProductController();

// Define product routes
router.get("/", productController.getAllProducts);

// Add more routes as needed

module.exports = router;
