import express from "express";
import { registerTeam, getTeamsByTournament, updateTeamStatus, getTeamsByUser } from "../controllers/teamController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js"; // Ensure authentication

const router = express.Router();

router.post("/register", verifyToken, registerTeam); // Register a team (Only authenticated users can register a team)
router.get("/tournament/:tournamentId", getTeamsByTournament); // Get teams for a specific tournament
router.put("/:teamId/status", updateTeamStatus); // Only admin can approve/reject a team
router.get("/user/:userId", getTeamsByUser);

export default router;
