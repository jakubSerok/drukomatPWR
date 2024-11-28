import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
function createToken(user) {
  const secretKey = process.env.JWT_SECRET; // Make sure this is defined
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
}

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    //check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users from the database

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

// Edit user

const editUser = async (req, res) => {
  const { _id, name, email, phone } = req.body; // Get user details from the request body

  try {
    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found" });
    }

    // Update user details

    user.name = name || user.name;

    user.email = email || user.email;

    user.phone = phone || user.phone;

    await user.save(); // Save the updated user

    res.json({ success: true, message: "User  updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).json({ success: false, message: "Error updating user" });
  }
};

// Remove user

const removeUser = async (req, res) => {
  const { _id } = req.body; // Get user ID from the request body

  try {
    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found" });
    }

    await userModel.findByIdAndDelete(_id); // Delete the user

    res.json({ success: true, message: "User  deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};
export { loginUser, registerUser, getAllUsers, editUser, removeUser };
