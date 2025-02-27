import mongoose from "mongoose";
// import Tournament from "./Tournament";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captainName: { type: String, required: true },
  captainPhone: { type: String, required: true },
  captainEmail: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who registered the team
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Team approval status
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Team", teamSchema);
