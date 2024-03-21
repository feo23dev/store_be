const ProductModel = require("../models/ProductModel");
const AppError = require("../utils/appError");

class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productModel.getAllProducts();

      res.status(200).json({ status: "success", data: products });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };

  getProductById = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await this.productModel.getProductById(id);

      res.status(200).json({ status: "success", data: product });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };
}

module.exports = ProductController;
