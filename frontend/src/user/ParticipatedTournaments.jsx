import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";

const ParticipatedTournaments = () => {
  const { user, userTeams, fetchTeamsByUser } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTeams = async () => {
      if (user) {
        try {
          setLoading(true);
          await fetchTeamsByUser(user.id);
        } catch (error) {
          console.error("Error fetching user teams:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserTeams();
  }, [user]);

  // console.log(userTeams);

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Participated Tournaments</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading tournaments...</p>
      ) : userTeams.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Tournament ID</th>
                <th className="border p-3 text-left">Tournament Name</th>
                <th className="border p-3 text-left">Sport Type</th>
                <th className="border p-3 text-left">City</th>
                <th className="border p-3 text-left">Dates</th>
                <th className="border p-3 text-left">Team Name</th>
                <th className="border p-3 text-left">Team ID</th>
                <th className="border p-3 text-left">Captain Name</th>
                <th className="border p-3 text-left">Captain Email</th>
                <th className="border p-3 text-left">Captain Phone</th>
                <th className="border p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userTeams.map((team, index) => (
                
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="border p-3">{team.tournamentId?._id || "N/A"}</td>
                  <td className="border p-3">{team.tournamentId?.name || "N/A"}</td>
                  <td className="border p-3">
                    {team.tournamentId?.sportType === "others"
                      ? team.tournamentId?.sportName || "N/A" 
                      : team.tournamentId?.sportType || "N/A"}
                  </td>
                  <td className="border p-3">
                    {team.tournamentId?.cityType === "others"
                      ? team.tournamentId?.cityName || "N/A" 
                      : team.tournamentId?.cityType || "N/A"}
                  </td>
                  {/* <td className="border p-3">{team.tournamentId?.sportType || "N/A"}</td> */}
                  <td className="border p-3">{team.tournamentId?.startDate ? new Date(team.tournamentId.startDate).toLocaleDateString() : "N/A"} - 
                  {team.tournamentId?.endDate ? new Date(team.tournamentId.endDate).toLocaleDateString() : "N/A"}</td>
                  <td className="border p-3">{team.teamName}</td>
                  <td className="border p-3">{team._id}</td>
                  <td className="border p-3">{team.captainName}</td>
                  <td className="border p-3">{team.captainEmail}</td>
                  <td className="border p-3">{team.captainPhone}</td>
                  {/* <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        team.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {team.status}
                    </span>
                  </td> */}

                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        team.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : team.status === "approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {team.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* {userTeams.map((team , idx)=>{

          })} */}

        </div>

        
      ) : (
        <p className="text-center text-gray-600">No tournaments found.</p>
      )}
    </div>
  );
};

export default ParticipatedTournaments;

