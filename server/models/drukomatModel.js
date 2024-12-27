import mongoose from "mongoose";

// Tworzymy schemat dla drukomatów
const drukomatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "out_of_service"],
    default: "active",
  },
  description: { type: String },
  Drafts: {
    type: Object,
    required: false,
  },
  PrintingModule: {
    type: Object,
    required: false,
  },
});

// Tworzymy model na podstawie schematu
const drukomatModel =
  mongoose.models.drukomat || mongoose.model("drukomat", drukomatSchema);
export default drukomatModel;
