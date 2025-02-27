import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BookingForm = () => {
  const location = useLocation();
  const tournamentId = location.state?.tournamentId; // Getting tournamentId from state
  // console.log("tournament id is : ",tournamentId);

  const { createBooking, user } = useContext(ApiContext); // Assuming user is stored in context
  const userId = user?.id; // Extract user ID
  // console.log("user id is: ",userId)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingID, setBookingID] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setMessage("Please Log in to book ticket.");
      return;
    }

    if (!name || !email || !phone || !tournamentId || !userId) {
      setMessage("❌ All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    // console.log("Submitting booking with data:", {
    //   name,
    //   email,
    //   phone,
    //   tournamentId,
    //   userId,
    // });

    const response = await createBooking({
      name,
      email,
      phone,
      tournamentId,
      userId,
    });

    // console.log("API Response:", response);

    if (response.success && response.data?.booking?._id) {
      const receivedBookingId = response.data.booking._id;
      setBookingID(receivedBookingId);
      setMessage(`✅ Yout ticket booked successfully! Your Ticket ID is ${receivedBookingId}`);
      toast.success(response.data.message);
      // Clear form fields
      setName("");
      setEmail("");
      setPhone("");

      setTimeout(() => setMessage(""), 5000); // Clear message after 5 sec
    } else {
      setMessage(response.message || "❌ Failed to book. Please try again.");
      toast.error(response.data.message)
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Book a Slot</h2>

      {message && <p className="text-blue-500 text-sm mb-2">{message}</p>}

      <div className="mb-3">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Phone Number</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
      {bookingID && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Your Ticket Booked successfully! Your Ticket ID is: <span className="text-black">{bookingID}</span>
        </p>
      )}
    </form>
  );
};

export default BookingForm;
