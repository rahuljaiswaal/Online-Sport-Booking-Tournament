import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { tournaments } from "../tournaments/tournaments";
import TournamentCard from "../tournaments/TournamentCard";
import { ApiContext } from "../context/ApiContext";


const allowedSports = ["cricket", "football",  "badminton"];

const FilteredSports = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();
  const { tournaments, fetchTournaments, loading } = useContext(ApiContext);
  
//   console.log(sportName);

  useEffect(() => {
        const loadTournaments = async () => {
          await fetchTournaments();
        };
        loadTournaments();
      }, [fetchTournaments]);

  // Convert sportName to lowercase for case-insensitive comparison
  const normalizedSportName = sportName.toLowerCase();

  // Check if sportName is in allowedSports; otherwise, default to "others"
  const sportToFilter = allowedSports.includes(normalizedSportName) ? normalizedSportName : "others";

  // **Filter tournaments correctly**
  const filteredTournaments = tournaments.filter((tournament) => {
    const tournamentSport = tournament.sportType.toLowerCase();

    if (sportToFilter === "others") {
      // If sportType is NOT in allowedSports, put it in "Others"
      return !allowedSports.includes(tournamentSport);
    }

    // Otherwise, only show tournaments matching the sport type
    return tournamentSport === sportToFilter;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {sportToFilter.charAt(0).toUpperCase() + sportToFilter.slice(1)} Tournaments
      </h1>
      {filteredTournaments.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament._id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tournaments found.</p>
      )}
    </div>
  );
};

export default FilteredSports;
