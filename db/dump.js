const db = require("./database");
const configFile = require("../db/config");
const database = new db(configFile);

const data = require("../products");

console.log("DATA IS HERE", data);

const populateDatabase = async (data) => {
  try {
    for (const product of data) {
      const query = `INSERT INTO products(id,description,name,price,image,company,category) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      const values = [
        product.id,
        product.description,
        product.name,
        product.price,
        product.image,
        product.company,
        product.category,
      ];

      await database.pool.query(query, values);
    }

    console.log("DATA IS POPULATED SUCCESFULY");
  } catch (error) {
    console.error("ERROR POPULATING THE DATABASE", error);
  }
};

module.exports = populateDatabase;
