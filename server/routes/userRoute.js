import express from "express";
import {
  registerUser,
  loginUser,
  editUser,
  removeUser,
  getAllUsers,
  getUserProfile,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/auth.js"; // For protected routes

const userRouter = express.Router();

userRouter.post("/register", registerUser); // User Registration
userRouter.post("/login", loginUser); // User Login
userRouter.post("/edit", editUser); // Edit user profile (protected)
userRouter.delete("/delete", removeUser); // Delete user
userRouter.get("/allUsers", getAllUsers); // Get all users
userRouter.get("/user", authMiddleware, getUserProfile); // Fetch current user profile

export default userRouter;
