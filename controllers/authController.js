const { user } = require("../db/config");
const UserModel = require("../models/UserModel");
const AppError = require("../utils/appError");

class AuthController {
  constructor() {
    this.userModel = new UserModel();
  }

  signUp = async (req, res, next) => {
    let userData = {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };
    if (!userData.email || !userData.password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Provide all the necessary fields" });
    }

    try {
      const existingUser = await this.userModel.getUserByEmail(userData.email);

      if (existingUser) {
        return res.send("Email already exists.Try logging in");
      } else {
        const newUser = await this.userModel.createUser(userData);
        res.status(201).json({ status: "success", data: { user: newUser } });
      }
    } catch (error) {
      next(new AppError(error.message, error.statusCode));
    }
  };
}

module.exports = AuthController;
