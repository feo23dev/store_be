const db = require("../db/database");
class ProductModel {
  constructor(name) {
    this.name = name;
  }

  getAllProducts() {
    return "Getting products";
  }
}

module.exports = ProductModel;
