import express from "express";
import { createBooking, getBookingsByTournament, getBookingsByUser, deleteBooking } from "../controllers/bookingController.js";
//import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/tournament/:tournamentId",  getBookingsByTournament);
router.get("/user/:userId",  getBookingsByUser);
router.delete("/:id", deleteBooking);

export default router; // ✅ Use default export
