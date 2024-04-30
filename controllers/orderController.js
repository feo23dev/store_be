const OrderModel = require("../models/OrderModel");

class OrderController {
  constructor() {
    this.orderModel = new OrderModel();
    this.createOrder = this.createOrder.bind(this);
  }
  async createOrder(req, res) {
    let formData = req.body.formData;
    let itemsArray = req.body.shoppingCart.items;

    try {
      const response = await this.orderModel.createOrder(formData, itemsArray);
      res.status(201).json({ status: "success", data: response });
    } catch (error) {
      console.log("Error creating order", error);
    }
  }
}

module.exports = OrderController;
