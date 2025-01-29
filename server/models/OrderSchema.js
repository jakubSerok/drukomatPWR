import mongoose from "mongoose";

// Order Schema
const OrderSchema2 = new mongoose.Schema({
  Status: { type: Number, default: 1 }, // Status of the order (e.g., 1 = pending, 2 = completed)
  creationDate: { type: Date, default: Date.now }, // Timestamp of order creation
  completionDate: { type: Date }, // Timestamp of order completion
  DrukomatID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drukomat",
    required: true,
  }, // Reference to the drukomat
  CollectionCode: { type: String, required: true }, // Collection code for the order
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user
  Files: { type: Object }, // Files associated with the order (e.g., { file1: "url1", file2: "url2" })
});

// Model for the Order schema
const orderschema =
  mongoose.models.Order || mongoose.model("Order", OrderSchema2);

// Export the model
export default orderschema;
