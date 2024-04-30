const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

const orderController = new OrderController();

router.post("/", orderController.createOrder);

module.exports = router;
