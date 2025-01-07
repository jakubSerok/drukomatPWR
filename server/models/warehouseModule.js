import mongoose from "mongoose";

const PrinterSchema = new mongoose.Schema({
  MAC: { type: String, required: true },
  Model: { type: String, required: true },
  Type: { type: String, required: true },
  Color: { type: Boolean, required: true },
  Size: { type: String, required: true },
  Status: { type: Number, required: true },
});

const CacheSchema = new mongoose.Schema({
  Id: { type: String, required: true },
  Status: { type: Number, required: true },
});

const PaperSchema = new mongoose.Schema({
  Format: { type: String, required: true },
  Type: { type: String, required: true },
});

const TonerSchema = new mongoose.Schema({
  Model: { type: String, required: true },
  Purpose: { type: String, required: true },
});

const WarehouseSchema = new mongoose.Schema({
  Printers: [PrinterSchema],
  Caches: [CacheSchema],
  Paper: [PaperSchema],
  Toners: [TonerSchema],
  CyanInk: { type: Number, required: true },
  MagentaInk: { type: Number, required: true },
});

const WarehouseModel =
  mongoose.models.Warehouses || mongoose.model("Warehouses", WarehouseSchema);

export default WarehouseModel;
