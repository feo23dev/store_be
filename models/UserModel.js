const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);

class UserModel {
  createUser = async (userData) => {
    const values = [
      userData.email,
      userData.password,
      userData.first_name,
      userData.last_name,
      userData.role_id,
    ];

    try {
      const text =
        "INSERT INTO users(email,password,first_name,last_name,role_id) VALUES($1,$2,$3,$4,$5) RETURNING *";

      const user = await database.pool.query(text, values);

      return user.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (userEmail) => {
    try {
      const text = "SELECT * FROM users WHERE email=$1";
      const values = [userEmail];
      const user = await database.pool.query(text, values);

      return user.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (userId) => {
    try {
      const text = "SELECT * FROM users WHERE id=$1";
      const values = [userId];
      const user = await database.pool.query(text, values);
      return user.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllUsers = async () => {
    try {
      const text = "SELECT * FROM users";
      const users = await database.pool.query(text);
      return users.rows;
    } catch (error) {
      throw new Error(error);
    }
  };

  didChangedPassword = async (email) => {
    try {
      const text = "SELECT * FROM password_change_history  WHERE email=$1";
      const values = [email];
      const user = await database.pool.query(text, values);
      return user.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserModel;
