const { Pool } = require("pg");

class Database {
  constructor(config) {
    this.pool = new Pool(config);
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
