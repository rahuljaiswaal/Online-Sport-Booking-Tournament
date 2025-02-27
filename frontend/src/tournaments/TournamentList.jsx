
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import { ApiContext } from "../context/ApiContext";
import { navbarDetails } from "../assets/navbarDetails";

const TournamentList = () => {
  const navigate = useNavigate();
  const { filter } = useParams(); // e.g., "upcoming", "current", "recent"
  const { tournaments, fetchTournaments, loading } = useContext(ApiContext);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const tournamentFilters = navbarDetails.tournaments; // e.g., ["All", "Upcoming", "Current", "Recent"]

  // Fetch tournaments from the backend on component mount using async/await
  useEffect(() => {
    const loadTournaments = async () => {
      await fetchTournaments();
    };
    loadTournaments();
  }, [fetchTournaments]);

  // Filter tournaments based on URL parameter and current date using async/await
  useEffect(() => {
    const filterTournaments = async () => {
      const currentDate = new Date();
      let filtered = tournaments;

      if (filter === "upcoming") {
        filtered = tournaments.filter(
          (t) => new Date(t.startDate) > currentDate
        );
      } else if (filter === "current") {
        filtered = tournaments.filter(
          (t) =>
            new Date(t.startDate) <= currentDate &&
            new Date(t.endDate) >= currentDate
        );
      } else if (filter === "recent") {
        filtered = tournaments.filter((t) => new Date(t.endDate) < currentDate);
      }
      setFilteredTournaments(filtered);
    };

    filterTournaments();
  }, [filter, tournaments]);

  // console.log(filteredTournaments);

  return (
    <div className="container mx-auto p-4">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        {tournamentFilters.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              filter === category.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-gray-200 cursor-pointer"
            }`}
            onClick={() => navigate(`/tournaments/${category.toLowerCase()}`)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tournament Cards */}
      {loading ? (
        <p>Loading tournaments...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredTournaments
            .slice(0, showAll ? filteredTournaments.length : 6)
            .map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}
        </div>
       )} 

      {/* "View All" Button */}
      {!showAll && filteredTournaments.length > 6 && (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded flex items-center cursor-pointer"
          onClick={() => setShowAll(true)}
        >
          View All Tournaments ➡️
        </button>
      )}
    </div>
  );
};

export default TournamentList;

