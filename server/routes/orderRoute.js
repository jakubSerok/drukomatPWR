import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getUserOrders,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js"; // For protected routes
const orderRouter = express.Router();

// Creating a new order
orderRouter.post("/createOrder", createOrder);

// Getting all orders
orderRouter.get("/getOrders", getAllOrders);

// Updating an order by ID
orderRouter.post("/updateOrder/:id", updateOrder);

// Deleting an order by ID
orderRouter.post("/deleteOrder/:id", deleteOrder);

orderRouter.get("/getUserOrders", authMiddleware, getUserOrders);

export default orderRouter;
