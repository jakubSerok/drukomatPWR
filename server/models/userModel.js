import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    archiwum: { type: Object, default: {} },
    levle: { type: String, default: "user" },
    type: { type: String, default: "user" },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
