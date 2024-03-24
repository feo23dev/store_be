const { promisify } = require("util");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

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
        return res.send("Email already exists.Try logging in");
      } else {
        // hash the password here just before we send it to db to create a user
        bcrypt.hash(userData.password, this.saltRound, async (err, hash) => {
          if (err) {
            console.log("Error while hashing", err);
          }

          //Created new user
          const newUser = await this.userModel.createUser({
            ...userData,
            password: hash,
          });

          // SIGN A JWT

          const token = this.signJWT(
            { id: newUser.id },
            process.env.JWT_SECRET,
            process.env.JWT_EXPIRES_IN
          );

          res.status(201).json({
            status: "success",
            token: token,
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
                // SIGN A JWT
                const token = this.signJWT(
                  { id: existingUser.id },
                  process.env.JWT_SECRET,
                  process.env.JWT_EXPIRES_IN
                );

                res.status(200).json({
                  data: "success",
                  token: token,
                  message: "Correct credentials",
                });
              } else {
                res.status(400).json({
                  data: "fail",
                  message: "Incorrect Password",
                });
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

  signJWT = (payload, secret, expiration) => {
    const token = jwt.sign(payload, secret, expiration);
    return token;
  };

  protect = async (req, res, next) => {
    // 1- Get the token
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("TOKEN IS", token);
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "You are not logged in!" });
    }

    // 2-Verification of token
    try {
      const decodedJWT = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      console.log(decodedJWT);
    } catch (error) {
      return res.status(400).json({ message: error });
    }

    // 3-Check if user still exists
    const user = this.userModel.getUserByEmail();

    // 4-Check if user changed password after the JWT was issued

    next();
  };
}

module.exports = AuthController;
