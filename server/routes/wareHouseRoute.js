import express from "express";
import {
  createWarehouse,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../controllers/wareHouseContriller.js";

const router = express.Router();

router.post("/createWareHouse", createWarehouse);
router.get("/:id", getWarehouse);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

export default router;
