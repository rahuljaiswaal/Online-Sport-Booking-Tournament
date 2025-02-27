import mongoose from "mongoose";
// import Team from "./Team";

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportType: { type: String, enum: ["cricket", "football", "badminton", "others"], required: true },
  sportName: { type: String },
  cityType: { type: String, enum: ["patna", "mumbai", "chennai", "delhi", "banglore","others"], required: true },
  cityName: { type: String},
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Venue admin
  teams: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  venue: { type: String, required: true },
  maxFansAllowed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  RegistrationLastDate: { type: Date, required: true },
  EntryFee: { type: Number, required: true },
  TicketFee: { type: Number, required: true },
  maxTeams:{type: Number, required: true}
});

export default mongoose.model("Tournament", tournamentSchema);
