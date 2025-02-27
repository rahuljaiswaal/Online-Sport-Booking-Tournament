import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  venueAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sportType: { type: String, required: true },
  equipmentName: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Inventory", inventorySchema);
