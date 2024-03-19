const ProductModel = require("../models/ProductModel");

class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productModel.getAllProducts();
      console.log("Products are here", products);
      res.json(products);
    } catch (error) {
      console.log("Error fetching..controller", error);
      res.status(500).send(error);
    }
  }
}

module.exports = ProductController;
