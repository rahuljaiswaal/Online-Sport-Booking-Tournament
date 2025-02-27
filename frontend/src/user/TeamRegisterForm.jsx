import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useLocation } from "react-router-dom";

const TeamRegisterForm = () => {
  const location = useLocation();
  const tournamentId = location.state?.tournamentId;

  const { registerTeam, user } = useContext(ApiContext);

  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [teamId, setTeamId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setMessage("Please Log in to team register");
      return;
    }

    if (!teamName || !captainName || !captainPhone || !captainEmail || !tournamentId) {
      setMessage("❌ All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(captainPhone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail)) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    // console.log("Submitting team with data:", {
    //   teamName,
    //   captainName,
    //   captainPhone,
    //   captainEmail,
    //   tournamentId,
    // });

    const response = await registerTeam({
      teamName,
      captainName,
      captainPhone,
      captainEmail,
      tournamentId,
    });

    // console.log("API Response:", response);

    if (response.success && response.data?.team?._id) {
      const receivedTeamId = response.data.team._id;
      setTeamId(receivedTeamId);
      setMessage(`✅ Team registered successfully! Your Team ID is ${receivedTeamId}`);
      
      // Clear form fields
      setTeamName("");
      setCaptainName("");
      setCaptainPhone("");
      setCaptainEmail("");

      setTimeout(() => setMessage(""), 7000); // Clear message after 7 sec
    } else {
      setMessage(response.message || "❌ Failed to register team. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Register Your Team</h2>

      {message && <p className="text-blue-500 text-sm mb-2">{message}</p>}

      <div className="mb-3">
        <label className="block font-medium">Team Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Captain Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={captainName}
          onChange={(e) => setCaptainName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Captain Phone No</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={captainPhone}
          onChange={(e) => setCaptainPhone(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Captain Email ID</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-md"
          value={captainEmail}
          onChange={(e) => setCaptainEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register Team"}
      </button>

      {teamId && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Team registered successfully! Your Team ID is: <span className="text-black">{teamId}</span>
        </p>
      )}
    </form>
  );
};

export default TeamRegisterForm;



