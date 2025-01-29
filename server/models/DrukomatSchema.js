import mongoose from "mongoose";

// Drukomat Schema
const DrukomatSchema2 = new mongoose.Schema({
  Name: { type: String, required: true }, // Name of the drukomat
  Latitude: { type: String, required: true }, // Latitude of the drukomat location
  Longitude: { type: String, required: true }, // Longitude of the drukomat location
  Status: { type: Number, default: 1 }, // Status of the drukomat (e.g., 1 = active, 0 = inactive)
  Address: { type: String, required: true }, // Address of the drukomat
  Drafts: { type: mongoose.Schema.Types.ObjectId, ref: "Draft" }, // Reference to drafts (if applicable)
  PrintingModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PrintingModule",
  }, // Reference to printing module (if applicable)
});

// Model for the Drukomat schema
const drukomatModel2 =
  mongoose.models.Drukomat || mongoose.model("Drukomat", DrukomatSchema2);

// Export the model
export default drukomatModel2;
