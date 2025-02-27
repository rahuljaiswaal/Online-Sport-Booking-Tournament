
import React, { useEffect, useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";

const YourTournaments = () => {
  const navigate = useNavigate();
  const { user, fetchTournaments, tournaments = [], loading } = useContext(ApiContext);
  const [adminTournaments, setAdminTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTournaments();
      if (user && user?.role === "venue_admin" && tournaments.length > 0) {
        let array = tournaments.filter((tournament) => tournament.organizer._id === user.id)
        setAdminTournaments(array);
        // console.log(array);  
      }
    }
    fetchData();
  }, [user]);

  if (loading) return <p>Loading tournaments...</p>;

  if (!user || user.role !== "venue_admin") {
    return <p className="text-red-500">You are not authorized to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tournaments</h2>
      {adminTournaments.length === 0 ? (
        <p>No tournaments created by you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminTournaments.map((tournament) => (
            <div key={tournament._id} className="border p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{tournament.name}</h3>
              {tournament.sportType === "others" ? (
                <p><strong>Sport:</strong> {tournament.sportName}</p>
              ):(
                <p><strong>Sport:</strong> {tournament.sportType}</p>
              )
              }
              <p><strong>Date:</strong> {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</p>
              <p><strong>Venue:</strong> {tournament.venue}</p> {/* Fixed city name */}
              {tournament.cityType === "others" ? (
                <p><strong>City:</strong> {tournament.cityName}</p>
              ):(
                <p><strong>City:</strong> {tournament.cityType}</p>
              )
              }
              <p><strong>Max Fans:</strong> {tournament.maxFansAllowed}</p>
              <p><strong>Entry Fee:</strong> ₹{tournament.EntryFee}</p>
              <p><strong>Ticket Fee:</strong> ₹{tournament.TicketFee}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => navigate(`/venue-admin-dashboard/${user.id}/your-tournaments/detail/${tournament._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => navigate(`/venue-admin-dashboard/${user.id}/create-tournament`)}
      >
        Create Tournament
      </button>
    </div>
  );
};

export default YourTournaments;



