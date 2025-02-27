import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create API Context
export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const locateRoute = "http://localhost:5000"; // ✅ Fix: Add 'http://'
  
  const navigate = useNavigate();
  // Global State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]); // ✅ New state for storing teams
  const [userTeams, setUserTeams] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  // Handle API errors (e.g., logout on unauthorized)
  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      logoutUser();
    }
    console.error("API error:", error.response?.data || error.message);
    throw error;
  };

  // Set Axios Default Authorization Header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile(); // ✅ Fetch user only when token is set
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  // checking data
//   useEffect(() => {
//     console.log("👤 Current User in ApiContext:", user);
//   }, [user]); // Log whenever user changes

//   useEffect(() => {
//     console.log("📌 Updated userTeams:", userTeams);
//   }, [userTeams]);

//   useEffect(() => {
//     const fetchUser = async () => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser)); // ✅ Set user from local storage
//         } else {
//             // 🛑 If fetching from API, ensure it updates correctly
//             const userData = await getUserFromApi();
//             setUser(userData);
//             localStorage.setItem("user", JSON.stringify(userData)); // Cache it
//         }
//     };

//     fetchUser();
// }, []);

  // ✅ Register User
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${locateRoute}/api/auth/register`, userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Login User
  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${locateRoute}/api/auth/login`, credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Fetch User Profile
  const fetchUserProfile = async () => {
    try {
       setLoading(true);
      const response = await axios.get(`${locateRoute}/api/auth/profile`);
      setUser(response.data); 
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout User
  const logoutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Fetch All Tournaments
  const fetchTournaments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${locateRoute}/api/tournaments`);
      setTournaments(response.data.tournaments);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [locateRoute]);

  // ✅ Fetch Single Tournament
  const getTournamentById = async (id) => {
    try {
      const response = await axios.get(`${locateRoute}/api/tournaments/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Create Tournament
  const createTournament = async (tournamentData) => {
    try {
      const response = await axios.post(`${locateRoute}/api/tournaments`, tournamentData);
      fetchTournaments();
      return { success: true, message: "Tournament created successfully!", data: response.data };
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Update Tournament
  const updateTournament = async (id, updatedData) => {
    try {
      const response = await axios.put(`${locateRoute}/api/tournaments/${id}`, updatedData);
      fetchTournaments();
      return { success: true, message: "Tournament updated successfully!", data: response.data };
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Delete Tournament
  const deleteTournament = async (id) => {
    try {
      await axios.delete(`${locateRoute}/api/tournaments/${id}`);
      fetchTournaments();
    } catch (error) {
      handleApiError(error);
    }
  };

  // ✅ Fetch Teams by Tournament
  const fetchTeamsByTournament = async (tournamentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${locateRoute}/api/teams/tournament/${tournamentId}`);
      setTeams(response.data.teams); // ✅ Store teams in state
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register a Team
  const registerTeam = async (teamData) => {
    try {
      const response = await axios.post(`${locateRoute}/api/teams/register`, teamData);
      fetchTeamsByTournament(teamData.tournamentId); // ✅ Refresh teams list
      return { success: true, message: "Team registered successfully!", data: response.data };
    } catch (error) {
      handleApiError(error);
    }
  };

  // // ✅ Get all teams for a tournament
  // const getTeamsByTournament = async (tournamentId) => {
  //   try {
  //     const response = await fetch(`${locateRoute}/api/teams/tournament/${tournamentId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch teams");
  //     }
  
  //     const data = await response.json();
  //     return data.teams; // Returns an array of teams
  //   } catch (error) {
  //     console.error("Error fetching teams:", error);
  //     return [];
  //   }
  // };
  

  // ✅ Update Team Status (Approve/Reject)
  const updateTeamStatus = async (teamId, status, tournamentId) => {
    try {
      const response = await axios.put(`${locateRoute}/api/teams/${teamId}/status`, { status });
      fetchTeamsByTournament(tournamentId); // ✅ Refresh teams after update
      return { success: true, message: "Team status updated!", data: response.data };
    } catch (error) {
      handleApiError(error);
    }
  };


  // const updateTeamStatus = async (teamId, status) => {
  //   try {
  //     if (!token) {
  //       console.error("No auth token found!");
  //       return { success: false, message: "User not authenticated." };
  //     }
  
  //     const response = await axios.put(
  //       `${locateRoute}/api/teams/${teamId}/status`,
  //       { status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Send token
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     fetchTeamsByTournament(response.data.tournamentId);
  //     return { success: true, message: "Team status updated!", data: response.data };
  //   } catch (error) {
  //     console.error("API error:", error.response?.data || error);
  //     return { success: false, message: error.response?.data?.message || "An error occurred" };
  //   }
  // };
  
  


  // ✅ Fetch teams by userId
  const fetchTeamsByUser = async (userId) => {
    if (!userId) {
      console.error("⚠️ fetchTeamsByUser: User ID is undefined. Current user:", user);
      return;
    }
  
    try {
      (`🔍 Fetching teams for userId: ${userId}`);
      const response = await axios.get(`${locateRoute}/api/teams/user/${userId}`);
      setUserTeams(response.data.teams);
    } catch (error) {
      console.error("❌ Error fetching user teams:", error.response?.data || error.message);
      setUserTeams([]);
    }
  };


  // Add state for storing bookings

  // ✅ Fetch Teams by Tournament
  const fetchBookingsByTournament = async (tournamentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${locateRoute}/api/booking/tournament/${tournamentId}`);
      setBookings(response.data.bookings); // ✅ Store teams in state
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };


// ✅ Create Booking
const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${locateRoute}/api/booking/create`, bookingData);
    fetchBookingsByTournament(bookingData.tournamentId)
    // setBookings((prev) => [...prev, response.data]); // Update state with new booking
    return { success: true, message: "Booking created successfully!", data: response.data };
  } catch (error) {
    handleApiError(error);
  }
};

const fetchBookingsByUser = async (userId) => {
  if (!userId) {
    console.error("⚠️ fetchbookingByUser: User ID is undefined. Current user:", user);
    return;
  }
  try {
    // console.log(`🔍 Fetching booking for userId: ${userId}`);
    const response = await axios.get(`${locateRoute}/api/booking/user/${userId}`);
    setUserBookings(response.data.bookings);
  } catch (error) {
    console.error("❌ Error fetching user booking:", error.response?.data || error.message);
    setUserBookings([]);
  }
};

// ✅ Fetch All Bookings
// const fetchAllBookings = async () => {
//   try {
//     setLoading(true);
//     const response = await axios.get(`${locateRoute}/api/bookings`);
//     setBookings(response.data.bookings); // Update state with fetched bookings
//   } catch (error) {
//     handleApiError(error);
//   } finally {
//     setLoading(false);
//   }
// };

// // ✅ Fetch Booking by ID
// const getBookingById = async (id) => {
//   try {
//     const response = await axios.get(`${locateRoute}/api/bookings/${id}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

  

  return (
    <ApiContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        tournaments,
        teams, // ✅ Added teams state
        userTeams,
        setUserTeams,
        registerUser,
        loginUser,
        logoutUser,
        fetchUserProfile,
        fetchTournaments,
        getTournamentById,
        createTournament,
        updateTournament,
        deleteTournament,
        fetchTeamsByTournament, // ✅ Added fetch teams function
        registerTeam, // ✅ Added register team function
        updateTeamStatus, // ✅ Added update team status function
        fetchTeamsByUser,
        bookings,
        userBookings,
        setBookings,
        setUserBookings,
        fetchBookingsByUser,
        fetchBookingsByTournament,
        createBooking
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

