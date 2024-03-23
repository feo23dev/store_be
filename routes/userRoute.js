const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

const authController = new AuthController();
router.get("/", (req, res) => {
  res.send("<h1>Welcome to User Route</h1>");
});

console.log(typeof authController.signUp);
router.post("/signup", authController.signUp);

module.exports = router;
