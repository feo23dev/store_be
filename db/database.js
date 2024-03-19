const { Pool } = require("pg");

class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }
}

module.exports = Database;
