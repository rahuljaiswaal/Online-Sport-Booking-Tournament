// const Booking = require("../models/Booking.js");

// import Booking from "../models/Booking.js";

import Booking from "../models/Booking.js";


// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, userId, tournamentId } = req.body;
    if (!name || !email || !phone || !userId || !tournamentId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    (req.body)
    const newBooking = new Booking({ name, email, phone, userId, tournamentId });
    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
// ✅ Get all bookings for a tournament
export const getBookingsByTournament = async (req, res) => {
    try {
      const { tournamentId } = req.params;
  
      const bookings = await Booking.find({ tournamentId }).populate("userId", "name email");
      
      res.status(200).json({ bookings });
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings", error });
    }
  };
  
  // ✅ Get all bookings made by a user
  export const getBookingsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const bookings = await Booking.find({ userId }).populate("tournamentId");
      
      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found for this user" });
      }
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings", error });
    }
  };

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};


