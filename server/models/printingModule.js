import mongoose from "mongoose";

const PrintingModuleSchema = new mongoose.Schema({
  Printers: {
    type: Map,
    of: [String], // Map of warehouse IDs to arrays of printer IDs
    required: true,
  },
  Caches: {
    type: Map,
    of: [String], // Map of warehouse IDs to arrays of cache IDs
    required: true,
  },
});

const PrintingModuleModel =
  mongoose.models.PrintingModules ||
  mongoose.model("PrintingModules", PrintingModuleSchema);

export default PrintingModuleModel;
