import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// Create token
function createToken(user) {
  const secretKey = process.env.JWT_SECRET; // Make sure this is defined
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User  does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const {
    FirstName,
    LastName,
    address,
    email,
    password,
    phone,
    City,
    streetAndNumber,
    PostalCode,
    Country,
  } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User  already exists" });
    }

    // Validating email format & strong password
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

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      FirstName,
      LastName,
      address,
      email,
      password: hashedPassword,
      phone,
      City,
      streetAndNumber,
      PostalCode,
      Country,
    });
    const user = await newUser.save();
    const token = createToken(user);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export const getUserProfile = async (req, res) => {
  console.log("User  ID from request Profile featcg:", req.user); // Debugging line
  try {
    const user = await userModel.findById(req.user.id); // Using req.user.id
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
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
  const {
    _id,
    FirstName,
    LastName,
    address,
    email,
    phone,
    City,
    streetAndNumber,
    PostalCode,
    Country,
  } = req.body;

  try {
    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found" });
    }

    // Update user details
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.address = address || user.address;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.City = City || user.City;
    user.streetAndNumber = streetAndNumber || user.streetAndNumber;
    user.PostalCode = PostalCode || user.PostalCode;
    user.Country = Country || user.Country;

    await user.save(); // Save the updated user

    res.json({ success: true, message: "User  updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Error updating user" });
  }
};

// Remove user
const removeUser = async (req, res) => {
  const { id } = req.params; // Get user ID from the URL parameters

  try {
    const user = await userModel.findById(id); // Find the user by ID

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  not found" });
    }

    await userModel.findByIdAndDelete(id); // Delete the user

    res.json({ success: true, message: "User  deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

export { loginUser, registerUser, getAllUsers, editUser, removeUser };
