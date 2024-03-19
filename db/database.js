const { Pool } = require("pg");

class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      console.log("SUCCESFULY CONNECTED TO THE DATABASE");
      return client;
    } catch (error) {
      console.log("There was a problem connecting to the database");
      console.log(error);
    }
  }

  async query(sql, values = []) {
    try {
      const result = await this.pool.query(sql, values);
      console.log("RESULT QUERY", result.rows);
      return result;
    } catch (error) {
      console.log("ERROR GETTING INFORMATION FROM THE DATABASE");
      console.log(error);
    }
  }
}

module.exports = Database;
