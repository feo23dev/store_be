const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);
class ProductModel {
  constructor() {}

  getAllProducts = async () => {
    try {
      const query = {
        name: "fetch-products",
        text: "SELECT p.id, p.name AS product_name, p.price, p.image, p.description, c.name AS company_name, cat.name AS category_name, p.stok FROM products p JOIN company c ON p.company_id = c.id JOIN category cat ON p.category_id = cat.id",
      };
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching products ${error.message}`);
    }
  };

  getProductById = async (id) => {
    try {
      const query = {
        name: "fetch-product-by-id",
        text: "SELECT p.id AS product_id, p.name AS product_name, p.price, p.image, p.description, c.name AS company_name, cat.name AS category_name, p.stok FROM products p JOIN company c ON p.company_id = c.id JOIN category cat ON p.category_id = cat.id WHERE p.id = $1",
        values: [id],
      };
      const { rows } = await database.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${error.message}`);
    }
  };

  createNewProduct = async (productData) => {
    try {
      const query = {
        name: "create-product",
        text: "INSERT INTO products (name, price, image, description, company_id, category_id, stok) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        values: [
          productData.name,
          productData.price,
          productData.image,
          productData.description,
          productData.company_id,
          productData.category_id,
          productData.stok,
        ],
      };
      const { rows } = await database.pool.query(query);
      return rows[0];
    } catch (error) {
      throw new Error(`Error creating new product ${error.message}`);
    }
  };
}

module.exports = ProductModel;
