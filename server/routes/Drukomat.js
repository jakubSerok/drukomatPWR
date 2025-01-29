import express from "express";
const router = express.Router();
import Drukomat from "../models/DrukomatSchema.js";

// Get all drukomats
router.get("/getDrukomaty", async (req, res) => {
  try {
    const drukomaty = await Drukomat.find(); // Fetch all drukomats
    res.status(200).json(drukomaty); // Return the list of drukomats
  } catch (error) {
    console.error("Error fetching drukomats:", error);
    res.status(500).json({ message: "Failed to fetch drukomats." });
  }
});

export default router;
