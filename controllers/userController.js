const UserModel = require("../models/UserModel");
const AppError = require("../utils/appError");

class UserController {
  constructor() {
    this.UserModel = new UserModel();
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.UserModel.getAllUsers();
      res.status(200).json({ status: "success", data: { users: users } });
    } catch (error) {
      next(new AppError("Could not get users", error.statusCode));
    }
  };
}

module.exports = UserController;
