const db = require("../db/database");
const configFile = require("../db/config");
const database = new db(configFile);

const AppError = require("../utils/appError");
class UserModel {
  createUser = async (userData) => {
    console.log("CREATE USER RUN1");
    const values = [
      userData.email,
      userData.password,
      userData.first_name,
      userData.last_name,
    ];
    console.log("values in userModel", values);
    try {
      const text =
        "INSERT INTO users(email,password,first_name,last_name) VALUES($1,$2,$3,$4) RETURNING *";

      const user = await database.pool.query(text, values);
      console.log("SUCCESFULY CREATED A NEW USER", user.rows);
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

  getAllUsers = async () => {
    try {
      const text = "SELECT * FROM users";
      const users = await database.pool.query(text);
      return users.rows;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserModel;
