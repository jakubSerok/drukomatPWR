import mongoose from "mongoose";

// Define the schema for the File field
const fileSchema = new mongoose.Schema({
  DraftID: {
    type: Number,
    required: true,
  },
  UserFile: {
    type: String, // Assuming it's a file path or filename
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Color: {
    type: Boolean, // true for color, false for grayscale
    required: true,
  },
  Format: {
    type: String, // e.g., "A4", "A3", etc.
    required: true,
  },
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  Status: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3], // Example status: 0 = Pending, 1 = In Progress, 2 = Completed, 3 = Canceled
  },
  CreationDate: {
    type: Date,
    default: Date.now,
  },
  CompletionDate: {
    type: Date,
    default: null, // Set to null until the order is completed
  },
  DrukomantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drukomants", // Reference to Drukomant model if needed
    required: true,
  },
  CollectionCode: {
    type: String,
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
  File: {
    type: fileSchema, // Embed the file schema
    required: true,
  },
});

// Create the order model
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
