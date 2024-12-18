import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Creating a new order
orderRouter.post("/createOrder", createOrder);

// Getting all orders
orderRouter.get("/getOrders", getAllOrders);

// Updating an order by ID
orderRouter.post("/updateOrder/:id", updateOrder);

// Deleting an order by ID
orderRouter.post("/deleteOrder/:id", deleteOrder);

export default orderRouter;
