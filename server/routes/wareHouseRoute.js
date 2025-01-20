import express from "express";
import {
  createWarehouse,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getAllWarehouses,
} from "../controllers/wareHouseContriller.js";

const router = express.Router();

router.post("/createWareHouse", createWarehouse);
router.get("/warehouses", getAllWarehouses); // Add this route
router.get("/:id", getWarehouse);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

export default router;
