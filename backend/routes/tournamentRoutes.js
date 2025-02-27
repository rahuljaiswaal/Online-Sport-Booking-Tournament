import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js"; // Correct import
import {
  createTournament,
  getAllTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
} from "../controllers/tournamentController.js";

const router = express.Router();

// 🏆 Tournament Routes
router.post("/", verifyToken, createTournament);
router.get("/", getAllTournaments);
router.get("/:id", getTournamentById);
router.put("/:id", verifyToken, updateTournament);
router.delete("/:id", verifyToken, deleteTournament);

export default router;
