import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "venue_admin", "admin"],
    default: "user",
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.role === "venue_admin" ? false : true;
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User; // ✅ Add default export
