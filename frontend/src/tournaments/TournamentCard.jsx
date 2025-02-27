import React from "react";
import { NavLink, Route, Routes, useNavigate, useParams  } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";


const TournamentCard = ({ tournament }) => {
    const navigate = useNavigate();
    const { filter } = useParams(); // Get the current category
    return (
        <div key={tournament._id} className="border p-4 rounded shadow">
        <h3 className="text-lg font-bold">{tournament.name}</h3>
        {tournament.sportType === "others" ? (
          <p><strong>Sport:</strong> {tournament.sportName}</p>
        ):(
          <p><strong>Sport:</strong> {tournament.sportType}</p>
        )
        }
        
        <p><strong>Venue:</strong> {tournament.venue}</p>
        {tournament.cityType === "others" ? (
          <p><strong>City:</strong> {tournament.cityName}</p>
        ):(
          <p><strong>City:</strong> {tournament.cityType}</p>
        )
        }
        <p><strong>Dates:</strong> {new Date(tournament.startDate).toDateString()} - {new Date(tournament.endDate).toDateString()}</p>
        <button
          onClick={() => navigate(`/tournaments/${filter || "all"}/${tournament._id}`)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          View Details
        </button>
      </div>
    );
  };

  export default TournamentCard;