import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, Route, Routes, useNavigate } from "react-router-dom";
// import { tournaments } from "./tournaments";
import { ApiContext } from "../context/ApiContext";


const TournamentDetails = () => {
  const { filter, id } = useParams();
  // console.log(id);
  const { tournaments, fetchTournaments, loading } = useContext(ApiContext);
  // const [selectedTournamentId, setSelectedTournamentId] = useState(null);

  const Navigate = useNavigate();
  useEffect(() => {
      const loadTournaments = async () => {
        await fetchTournaments();
      };
      loadTournaments();
    }, [fetchTournaments]);

    const tournamentsData = tournaments;

  const tournament = tournamentsData.find((t) => t._id === id);

  if (!tournament) {
    return <p className="text-center text-gray-500">Tournament not found.</p>;
  }
  // const handleRegister = ()=>{
  //   Navigate(`/tournaments/${filter}/${id}/team-register`)
  // }
  return (
    <div className="container mx-auto p-6">
      <div className="border rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold">{tournament.name}</h2>
        {tournament.sportType === "others" ? (
          <p><strong>Sport:</strong> {tournament.sportName}</p>
        ):(
          <p><strong>Sport:</strong> {tournament.sportType}</p>
        )
        }
        <p><strong>Max Teams Allowed:</strong> {tournament.maxTeams}</p>
        <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>
        <p><strong>Venue:</strong> {tournament.venue}</p>
        {tournament.cityType === "others" ? (
          <p><strong>City:</strong> {tournament.cityName}</p>
        ):(
          <p><strong>City:</strong> {tournament.cityType}</p>
        )
        }
        <p><strong>Entry Fee:</strong> ₹{tournament.EntryFee}</p>
        <p><strong>Ticket Fee:</strong> ₹{tournament.TicketFee}</p>
        <p className="text-red-500"><strong>Last Date of Registration:</strong> {new Date(tournament.RegistrationLastDate).toLocaleDateString()}</p>

        {/* Buttons */}
        
        <div className="mt-4 flex gap-4">
          <NavLink
            to={`/tournaments/${filter}/${id}/team-register`}
            state={{ tournamentId: id }} // ✅ Pass tournamentId via state
          >
          <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
           // onClick={handleRegister}
          >Register Team</button>
          </NavLink>
          <NavLink
            to={`/tournaments/${filter}/${id}/book-ticket`}
            state={{ tournamentId: id }} // ✅ Pass tournamentId via state
          >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Book Ticket</button>
          </NavLink>
        </div>

      </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Rules & Regulations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>📌 **All players must carry a valid ID proof** for verification.</li>
            <li>📌 **Teams must report 30 minutes before their match time**; failure to do so may lead to disqualification.</li>
            <li>📌 **Use of abusive language or misconduct** will result in immediate suspension.</li>
            <li>📌 **No refund of entry fees** in case of withdrawal or disqualification.</li>
            <li>📌 **The referee/organizer’s decision will be final** and binding in all disputes.</li>
          </ul>
        </div>

    </div>
  );
};

export default TournamentDetails;
