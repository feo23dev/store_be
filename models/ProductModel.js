const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);
class ProductModel {
  constructor() {}

  async getAllProducts() {
    try {
      const query = {
        name: "fetch-products",
        text: "SELECT p.id, p.name AS product_name, p.price, p.image, p.description, c.name AS company_name, cat.name AS category_name, p.stok FROM products p JOIN company c ON p.company_id = c.id JOIN category cat ON p.category_id = cat.id",
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
        text: "SELECT p.id AS product_id, p.name AS product_name, p.price, p.image, p.description, c.name AS company_name, cat.name AS category_name, p.stok FROM products p JOIN company c ON p.company_id = c.id JOIN category cat ON p.category_id = cat.id WHERE p.id = $1",
        values: [id],
      };
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${id}`);
    }
  }
}

module.exports = ProductModel;
