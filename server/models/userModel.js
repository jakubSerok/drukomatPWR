import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ObjectId
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }, // Changed to String to accommodate various phone formats
    City: { type: String, required: true },
    streetAndNumber: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Country: { type: String, required: true },
    password: { type: String, required: true },
    levle: { type: String, default: "user" },
    type: { type: String, default: "user" },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
