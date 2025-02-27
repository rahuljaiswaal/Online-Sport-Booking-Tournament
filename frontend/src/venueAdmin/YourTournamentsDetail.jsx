import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourTournamentsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTournamentById, fetchTeamsByTournament, teams, updateTeamStatus, fetchBookingsByTournament, bookings } = useContext(ApiContext);
  const [tournament, setTournament] = useState(null);
  // const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const getTournament = async () => {
      try {
        const data = await getTournamentById(id);
        setTournament(data);
      } catch (error) {
        console.error("Error fetching tournament details:", error);
      } finally {
        setLoading(false);
      }
    };
    getTournament();
  }, [id, getTournamentById]);


  useEffect(() => {
    const fetchTeams = async () => {
      const data = await fetchTeamsByTournament(id);
      // setTeams(data);
    };
    
    if (id) {
      fetchTeams();
    }
  }, [id]);

  // useEffect(()=>{
  //   const getBookings = async ()=>{
  //     try{
  //       const dataBookTkt = fetchBookingsByTournament(id);
  //       setTicket(dataBookTkt);
  //     }catch (error) {
  //       console.error("Error fetching booking details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getBookings();
  // },[id]);

  useEffect(()=>{
    const fetchTickets = async ()=>{
      await fetchBookingsByTournament(id);
    };
    if(id){
      fetchTickets();
    }
  },[id]);

  // console.log(bookings);

  // console.log(teams);
  // console.log(tournament?._id);
    const handleUpdateStatus = async (teamId, status) => {
    const result = await updateTeamStatus(teamId, status , tournament?._id);
    if (result?.success) {
      toast.success("Status SuccessFully Updated")
    }
  else toast.error("error")
  };

  if (loading) return <p className="text-center">Loading tournament details...</p>;

  if (!tournament) {
    return <p className="text-center text-red-500">Tournament not found!</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{tournament.name}</h2>
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
      <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>
      <p><strong>Max Teams:</strong> {tournament.maxTeams || "N/A"}</p>
      <p><strong>Max Fans Allowed:</strong> {tournament.maxFansAllowed}</p>
      <p><strong>Entry Fee:</strong> ₹{tournament.EntryFee}</p>
      <p><strong>Ticket Fee:</strong> ₹{tournament.TicketFee}</p>
      
      <h3 className="text-xl font-semibold mt-6">Registered Teams</h3>
      

      {teams && teams.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Team ID</th>
                <th className="border p-2">Team Name</th>
                <th className="border p-2">Captain Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{team._id}</td>
                  <td className="border p-2">{team.teamName}</td>
                  <td className="border p-2">{team.captainName}</td>
                  <td className="border p-2">{team.captainPhone}</td>
                  <td className="border p-2">{team.captainEmail}</td>
                  {/* <td className="border p-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md  mb-3"
                      onClick={() => handleUpdateStatus(team._id, "approved")}
                    >Accept</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleUpdateStatus(team._id, "rejected")}
                    >Reject</button>
                  </td> */}
                  <td className="border p-2">
                    {team.status === "pending" ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md mb-3 mr-2"
                          onClick={() => handleUpdateStatus(team._id, "approved")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                          onClick={() => handleUpdateStatus(team._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className={`px-3 py-1 rounded-md ${
                          team.status === "approved" ? "bg-green-500" : "bg-red-500"
                        } text-white cursor-not-allowed`}
                        disabled
                      >
                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-2 text-center">No teams have registered yet.</p>
      )}


    <h2 className="text-2xl font-bold mb-4 text-center mt-4">Ticket Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Ticket ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-2">{booking._id}</td>
                <td className="border p-2">{booking.name}</td>
                <td className="border p-2">{booking.email}</td>
                <td className="border p-2">{booking.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-2 text-center">No bookings available.</p>
      )}
      
      <button
        onClick={() => navigate(`/venue-admin-dashboard/${tournament.organizer._id}/your-tournaments`)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Back to Your Tournaments
      </button>
    </div>
  );
};

export default YourTournamentsDetail;




// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ApiContext } from "../context/ApiContext";

// const YourTournamentsDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { getTournamentById, fetchTeamsByTournament, teams, updateTeamStatus } = useContext(ApiContext);
//   const [tournament, setTournament] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getTournament = async () => {
//       try {
//         const data = await getTournamentById(id);
//         setTournament(data);
//       } catch (error) {
//         console.error("Error fetching tournament details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getTournament();
//   }, [id, getTournamentById]);

//   useEffect(() => {
//     if (id) {
//       fetchTeamsByTournament(id);
//     }
//   }, [id, fetchTeamsByTournament]);

//   const handleUpdateStatus = async (teamId, status) => {
//     const result = await updateTeamStatus(teamId, status);
//     if (result?.success) {
//       alert(`Team status updated to ${status}!`);
//     }
//   };

//   if (loading) return <p className="text-center">Loading tournament details...</p>;
//   if (!tournament) return <p className="text-center text-red-500">Tournament not found!</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">{tournament.name}</h2>
//       <p><strong>Sport:</strong> {tournament.sportType === "others" ? tournament.sportName : tournament.sportType}</p>
//       <p><strong>Venue:</strong> {tournament.venue}</p>
//       <p><strong>City:</strong> {tournament.cityType === "others" ? tournament.cityName : tournament.cityType}</p>
//       <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
//       <p><strong>End Date:</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>
//       <p><strong>Max Teams:</strong> {tournament.maxTeams || "N/A"}</p>
//       <p><strong>Max Fans Allowed:</strong> {tournament.maxFansAllowed}</p>
//       <p><strong>Entry Fee:</strong> ₹{tournament.EntryFee}</p>
//       <p><strong>Ticket Fee:</strong> ₹{tournament.TicketFee}</p>
      
//       <h3 className="text-xl font-semibold mt-6">Registered Teams</h3>

//       {teams && teams.length > 0 ? (
//         <div className="overflow-x-auto mt-4">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Team ID</th>
//                 <th className="border p-2">Team Name</th>
//                 <th className="border p-2">Captain Name</th>
//                 <th className="border p-2">Phone</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teams.map((team, idx) => (
//                 <tr key={idx} className="text-center">
//                   <td className="border p-2">{team._id}</td>
//                   <td className="border p-2">{team.teamName}</td>
//                   <td className="border p-2">{team.captainName}</td>
//                   <td className="border p-2">{team.captainPhone}</td>
//                   <td className="border p-2">{team.captainEmail}</td>
//                   <td className="border p-2">{team.status || "Pending"}</td>
//                   <td className="border p-2">
//                     <button 
//                       onClick={() => handleUpdateStatus(team._id, "accepted")}
//                       className="bg-green-500 text-white px-3 py-1 rounded-md mb-2 mr-2"
//                     >
//                       Accept
//                     </button>
//                     <button 
//                       onClick={() => handleUpdateStatus(team._id, "rejected")}
//                       className="bg-red-500 text-white px-3 py-1 rounded-md"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="mt-2 text-center">No teams have registered yet.</p>
//       )}

//       <button
//         onClick={() => navigate(`/venue-admin-dashboard/${tournament.organizer._id}/your-tournaments`)}
//         className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         Back to Your Tournaments
//       </button>
//     </div>
//   );
// };

// export default YourTournamentsDetail;























