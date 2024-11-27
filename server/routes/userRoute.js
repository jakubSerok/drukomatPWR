import express from "express";
import {
  loginUser,
  registerUser,
  editUser,
  removeUser,
  getAllUsers,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/edit", editUser);
userRouter.post("/delete", removeUser);
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
