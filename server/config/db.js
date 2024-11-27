import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://admin:admin@users.tmgbk.mongodb.net/?retryWrites=true&w=majority&appName=Users"
    )
    .then(() => console.log("DB connected"));
};
