import React from "react";
import { useNavigate } from "react-router-dom";


const VenueAdminNavbar = ({ id }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate(`/venue-admin-dashboard/${id}`)}>
        Venue Admin Dashboard
      </h1>
      <div className="space-x-4">
        <button onClick={() => navigate(`/venue-admin-dashboard/your-tournaments`)} className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Your Tournaments
        </button>
        <button onClick={() => navigate(`/venue-admin-dashboard/${id}/create-tournament`)} className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Create Tournament
        </button>
        <button onClick={() => navigate(`/venue-admin-dashboard/${id}/profile`)} className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Profile
        </button>
      </div>
    </nav>
  );
};

export default VenueAdminNavbar;
