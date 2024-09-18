import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();

// User registration route
router.route("/register").post(registerUser);

// User login route
router.route("/login").post(loginUser);

// Protected route for logging out
router.route("/logout").get(verifyJWT, logoutUser);

// Protected route for changing the password
router.route("/change-password").patch(verifyJWT, changePassword);

export default router;
