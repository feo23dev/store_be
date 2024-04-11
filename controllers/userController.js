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

  getAdminPage = (req, res) => {
    console.log("From admin page", req.user);
    console.log("this is request.user", req.user);
    res.send("Welcome to admin page");
  };
}

module.exports = UserController;
