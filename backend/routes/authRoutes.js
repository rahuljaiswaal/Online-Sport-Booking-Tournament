import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getUserProfile); // Protected route

export default router;

/*
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js"; // Correct import
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";

const router = express.Router();

// 🔹 Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getUserProfile); // Protect profile route

export default router;

*/
