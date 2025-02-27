import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";

const TicketBuy = () => {

    const{ user , userBookings, fetchBookingsByUser} = useContext(ApiContext);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchUserBooking = async () =>{
            if(user){
                try{
                    setLoading(true);
                    await fetchBookingsByUser(user.id);
                }catch(error){
                    console.error("Error fetching user bookings: ", error);
                }finally{
                    setLoading(false);
                }
            }
        };
        fetchUserBooking();
    },[user]);
    // console.log(userBookings);

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Purchased Tickets</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading tickets...</p>
      ) : userBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Tournament ID</th>
                <th className="border p-3 text-left">Tournament Name</th>
                <th className="border p-3 text-left">Sport Type</th>
                <th className="border p-3 text-left">City</th>
                <th className="border p-3 text-left">Date</th>
                {/* <th className="border p-3 text-left">End Date</th> */}
                <th className="border p-3 text-left">Venue</th>
                <th className="border p-3 text-left">Ticket ID</th>
                <th className="border p-3 text-left">Buyer Name</th>
                <th className="border p-3 text-left">Phone</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Ticket Fee</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="border p-3">{booking.tournamentId?._id || "N/A"}</td>
                  <td className="border p-3">{booking.tournamentId?.name || "N/A"}</td>
                  <td className="border p-3">
                    {booking.tournamentId?.sportType === "others"
                      ? booking.tournamentId?.sportName || "N/A"
                      : booking.tournamentId?.sportType || "N/A"}
                  </td>
                  <td className="border p-3">{booking.tournamentId?.cityType || "N/A"}</td>
                  <td className="border p-3">
                    {booking.tournamentId?.startDate
                      ? new Date(booking.tournamentId.startDate).toLocaleDateString()
                      : "N/A"} - {booking.tournamentId?.endDate
                        ? new Date(booking.tournamentId.endDate).toLocaleDateString()
                        : "N/A"}
                  </td>
                  {/* <td className="border p-3">
                    {booking.tournamentId?.endDate
                      ? new Date(booking.tournamentId.endDate).toLocaleDateString()
                      : "N/A"}
                  </td> */}
                  <td className="border p-3">{booking.tournamentId?.venue || "N/A"}</td>
                  <td className="border p-3">{booking._id}</td>
                  <td className="border p-3">{booking.name}</td>
                  <td className="border p-3">{booking.phone}</td>
                  <td className="border p-3">{booking.email}</td>
                  <td className="border p-3">₹{booking.tournamentId?.TicketFee || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No tickets found.</p>
      )}
    </div>
  )
}

export default TicketBuy