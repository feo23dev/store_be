const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);
class ProductModel {
  constructor() {}

  async getAllProducts() {
    try {
      const query = "SELECT * FROM products";
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error("Error fetching products from the database");
    }
  }
}

module.exports = ProductModel;
