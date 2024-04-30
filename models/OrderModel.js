const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);

class OrderModel {
  constructor() {}

  async createOrder(formData, shoppingCart) {
    try {
      await database.pool.query("BEGIN"); // Start a transaction
      const orderInsertResult = await database.pool.query(
        `INSERT INTO orders (fullname, order_date, total_price, address, city, country, email, postal_code)
             VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7)
             RETURNING id`,
        [
          formData.fullName,
          formData.total,
          formData.address,
          formData.city,
          formData.country,
          formData.email,
          formData.postalCode,
        ]
      );

      const orderId = orderInsertResult.rows[0].id;
      console.log("SHOPPOING", shoppingCart);

      for (const item of shoppingCart) {
        await database.pool.query(
          `INSERT INTO order_products (order_id, product_id, quantitiy)
           VALUES ($1, $2, $3)`,
          [orderId, item.id, item.amount]
        );
      }
      await database.pool.query("COMMIT");
    } catch (error) {
      console.log("Error creating order", error);
      await database.pool.query("ROLLBACK"); // Rollback the transaction if an error occurs

      throw error; // Throw the error for handling in the calling function
    }
  }
}

module.exports = OrderModel;
