import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@users.tmgbk.mongodb.net/Drukomat?retryWrites=true&w=majority&appName=Users"
    );
    console.log("DB connected to Drukoamt");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
