import mongoose from "mongoose";

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
    required: false,
  },
  DrukomantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drukomant", // Reference to Drukomant model if needed
    required: true,
  },
  CollectionCode: {
    type: String,
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  File: {
    type: Object, // You can use Buffer or a reference to a file service if required
    required: false,
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
