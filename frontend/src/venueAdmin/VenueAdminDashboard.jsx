import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const VenueAdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Component */}
      {/* <VenueAdminNavbar id={id} /> */}

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Venue Admin!</h2>

        {/* Responsibilities & Roles */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Responsibilities</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Manage and oversee tournaments in your venue.</li>
            <li>Approve or reject team registrations for tournaments.</li>
            <li>Set up tournament details, such as dates, entry fees, and max teams.</li>
            <li>Monitor and manage venue bookings for smooth tournament operations.</li>
            <li>Ensure fair play and maintain discipline in tournaments.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={() => navigate(`/venue-admin-dashboard/${id}/your-tournaments`)} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            View Your Tournaments
          </button>
          <button onClick={() => navigate(`/venue-admin-dashboard/${id}/create-tournament`)} className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700">
            Create Tournament
          </button>
          <button onClick={() => navigate(`/venue-admin-dashboard/${id}/profile`)} className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueAdminDashboard;
