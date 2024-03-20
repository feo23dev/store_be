const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);
class ProductModel {
  constructor() {}

  async getAllProducts() {
    try {
      const query = {
        name: "fetch-products",
        text: "SELECT * FROM products",
      };
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error("Error fetching products from the database");
    }
  }

  async getProductById(id) {
    try {
      const query = {
        name: "fetch-product-by-id",
        text: "SELECT * FROM products WHERE id = $1",
        values: [id],
      };
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching product with ${id}`);
    }
  }
}

module.exports = ProductModel;
