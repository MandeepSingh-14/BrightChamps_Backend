import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized token", // Return error if no token found
        success: false,
      });
    }

    // Verify the token using the secret key
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    // Check if token could not be verified (just for safety, this usually throws an error if verification fails)
    if (!decodedToken) {
      return res.status(401).json({
        message: "Invalid token", // Return error if token is invalid
        success: false,
      });
    }

    // Attach the userId from the decoded token to the request object for use in subsequent middleware/routes
    req.id = decodedToken.userId;

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while verifying the token", // Return generic error message
      success: false,
    });
  }
};
