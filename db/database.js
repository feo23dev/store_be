const { Pool } = require("pg");

class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      return client;
      console.log("Succesfuly connected to the database", client);
    } catch (error) {
      console.log("There was a problem connecting to the database");
      console.log(error);
    }
  }

  async query(sql, values) {
    try {
      const result = await this.pool.query(sql, (values = []));
      console.log(result.rows[0].description);
    } catch (error) {
      console.log("ERROR GETTING INFORMATION FROM THE DATABASE");
      console.log(error);
    }
  }
}

module.exports = Database;
