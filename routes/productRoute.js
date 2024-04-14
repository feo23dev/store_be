const ProductController = require("../controllers/productController");
const AuthController = require("../controllers/authController");

const productController = new ProductController();
const authController = new AuthController();
const express = require("express");
const router = express.Router();
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product-${req.body.name}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Multer

// Define product routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/create",
  authController.protect,
  authController.restrictTo,
  upload.single("image"),
  productController.createNewProduct
);

// Add more routes as needed

module.exports = router;
