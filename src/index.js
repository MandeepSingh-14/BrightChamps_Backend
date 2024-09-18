import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config(); // Initialize environment variables
import { connectDB } from "./db/index.js"; // Database connection
import userRoutes from "./routes/userRoute.js"; // Import user routes

const app = express();

// Middleware to parse JSON requests and cookies
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies from incoming requests

// Define user-related routes under `/api/v1/users`
app.use("/api/v1/users", userRoutes);

// Set the server port from environment variable or default to 8000
const PORT = process.env.PORT || 8000;

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    await connectDB(); // Establish database connection before starting the server
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message); // Log any DB connection error
    process.exit(1); // Exit if the database connection fails
  }
});
