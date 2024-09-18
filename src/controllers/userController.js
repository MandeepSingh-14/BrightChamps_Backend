import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Regular expressions for email and password validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format validation
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password complexity requirements

// Controller to register a new user
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body; // Extract user input

    // Ensure all required fields are present
    if ([fullname, email, password].some((field) => field?.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    // Validate password complexity
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must meet complexity requirements",
        success: false,
      });
    }

    // Check if the user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, password: hashedPassword });

    return res
      .status(201)
      .json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during registration",
      success: false,
    });
  }
};

// Controller to login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract login details

    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }

    // Compare entered password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    // Generate JWT token for the user
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set token as a cookie and return success response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day expiry
        httpOnly: true, // Cookie not accessible via JS
        sameSite: "strict", // Strict same-site policy
      })
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during login", success: false });
  }
};

// Controller to logout a user
const logoutUser = async (req, res) => {
  try {
    // Clear the JWT token cookie
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during logout", success: false });
  }
};

// Controller to change the user's password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body; // Extract passwords

    // Ensure both old and new passwords are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old and new passwords are required",
        success: false,
      });
    }

    // Find the user by ID (set by middleware)
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Verify old password matches
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Old password is incorrect", success: false });
    }

    // Validate new password
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "New password must meet complexity requirements",
        success: false,
      });
    }

    // Hash the new password and update the user's password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while changing the password",
      success: false,
    });
  }
};

// Export all controllers
export { registerUser, loginUser, logoutUser, changePassword };
