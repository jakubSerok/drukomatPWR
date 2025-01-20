import mongoose from "mongoose";

const PrintingModuleSchema = new mongoose.Schema({
  Printers: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: "Printer" }],
    required: true,
  },
  Caches: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cache" }],
    required: true,
  },
});

const PrintingModuleModel =
  mongoose.models.PrintingModules ||
  mongoose.model("PrintingModules", PrintingModuleSchema);

export default PrintingModuleModel;
