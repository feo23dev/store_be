const { json } = require("express");
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

  deleteUserById = async (req, res, next) => {
    const userId = req.params.id;

    try {
      const resp = await this.UserModel.deleteUserById(userId);

      if (resp.rowCount > 0) {
        res
          .status(200)
          .json({ status: "success", message: "User deleted successfully" });
      } else {
        res.status(404).json({ status: "error", message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: "Failed" });
    }
  };

  getAdminPage = (req, res) => {
    res.json({ status: "success", data: "Admin page" });
  };
}

module.exports = UserController;
