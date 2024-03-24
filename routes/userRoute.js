const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const UserController = require("../controllers/userController");

const authController = new AuthController();
const userController = new UserController();

router.get("/", userController.getAllUsers);

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
