const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");
const productController = new ProductController();

const AuthController = require("../controllers/authController");

const authController = new AuthController();

// Define product routes
router.get("/", authController.protect, productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Add more routes as needed

module.exports = router;
