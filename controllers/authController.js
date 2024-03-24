const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const AppError = require("../utils/appError");
const { password, database } = require("../db/config");

class AuthController {
  constructor() {
    this.userModel = new UserModel();
    this.saltRound = 12;
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
        const storedPassword = existingUser.password;

        return res.send("Email already exists.Try logging in");
      } else {
        // hash the password here just before we send it to db to create a user
        bcrypt.hash(userData.password, this.saltRound, async (err, hash) => {
          if (err) {
            console.log("Error while hashing", err);
          }
          const newUser = await this.userModel.createUser({
            ...userData,
            password: hash,
          });
          res.status(201).json({
            status: "success",
            data: `User created with ${newUser.email}`,
          });
        });
      }
    } catch (error) {
      next(new AppError(error.message, error.statusCode));
    }
  };

  login = async (req, res) => {
    //check if the user with the email exists
    const { email } = req.body;
    const loginPassword = req.body.password;
    if (!loginPassword || !email) {
      return res
        .status(400)
        .json({ data: "error", message: "Provide required credentials" });
    }

    try {
      const existingUser = await this.userModel.getUserByEmail(email);

      if (existingUser) {
        console.log("User exist with this email", existingUser);
        const hashedPasswordInDatabase = existingUser.password;
        bcrypt.compare(
          loginPassword,
          hashedPasswordInDatabase,
          (err, result) => {
            if (err) {
              console.log("ERROR COMPARING PASSWORDS");
            } else {
              if (result) {
                res
                  .status(200)
                  .json({ data: "success", message: "Correct credentials" });
              } else {
                res
                  .status(400)
                  .json({ data: "fail", message: "WRONG PASSWORD" });
              }
            }
          }
        );
      } else {
        res.status(400).json({
          data: "fail",
          message: "User Does not exist,Sign Up to continue",
        });
      }
    } catch (error) {
      res.send(error);
    }
  };
}

module.exports = AuthController;
