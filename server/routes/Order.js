import express from "express";
const router = express.Router();
import Order from "../models/OrderSchema.js";

// Get orders by drukomat ID
router.get("/getOrdersByDrukomatId/:drukomatId", async (req, res) => {
  try {
    const drukomatId = req.params.drukomatId; // Extract drukomat ID from the request
    const orders = await Order.find({ DrukomatID: drukomatId }); // Fetch orders for the drukomat
    res.status(200).json(orders); // Return the list of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});
router.post("/updateOrder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId; // Extract order ID from the request
    const { Status, completionDate } = req.body; // Extract new status and completion date from the request body

    // Find the order and update its status and completion date
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { Status, completionDate },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(updatedOrder); // Return the updated order
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order." });
  }
});

export default router;
