import express from "express";
import {
  createPrintingModule,
  getPrintingModule,
  updatePrintingModule,
  deletePrintingModule,
} from "../controllers/printingModuleController.js";

const router = express.Router();

router.post("/createPrintingModule", createPrintingModule);
router.get("/:id", getPrintingModule);
router.put("/:id", updatePrintingModule);
router.delete("/:id", deletePrintingModule);

export default router;
