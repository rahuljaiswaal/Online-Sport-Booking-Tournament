import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar"; // Adjust the path if needed
import Register from "./auth/Register";
import Login from "./auth/Login";
import TournamentList from "./tournaments/TournamentList";
import TournamentDetails from "./tournaments/TournamentDetails";
import { tournaments } from "./tournaments/tournaments.js";
import { navbarDetails } from "./assets/navbarDetails.js";
import Sports from "./sports/Sports";
import FilteredSports from "./sports/FilteredSports.jsx";
import Cities from "./cities/Cities.jsx";
import FilteredCities from "./cities/FilteredCities.jsx";
import VenueAdminDashboard from "./venueAdmin/VenueAdminDashboard.jsx";
import Profile from "./venueAdmin/Profile.jsx";
import YourTournaments from "./venueAdmin/YourTournaments.jsx";
import YourTournamentsDetail from "./venueAdmin/YourTournamentsDetail.jsx";
import VenueAdminNavbar from "./venueAdmin/VenueAdminNavbar.jsx";
import CreateTournament from "./venueAdmin/CreateTournamet.jsx";
import Hero from "./Hero.jsx";
import UserProfile from "./user/UserProfile.jsx";
import TeamRegisterForm from "./user/TeamRegisterForm.jsx";
import ParticipatedTournaments from "./user/ParticipatedTournaments.jsx";
import BookingForm from "./user/BookingForm.jsx";
import TicketBuy from "./user/TicketBuy.jsx";
import Footer from "./shared/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 

const App = () => {
  const Navigate = useNavigate();
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Hero/>} />
        {/* Default Tournament List */}
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/user-profile/:id/participated-tournaments" element={<ParticipatedTournaments />} />
        <Route path="/user-profile/:id/your-tickets" element={<TicketBuy />} />
        <Route path="/tournaments" element={<TournamentList />} />
        
        {/* Tournament List Based on Category */}
        <Route path="/tournaments/:filter" element={<TournamentList />} />
        
        {/* Tournament Details Based on Category */}
        <Route path="/tournaments/:filter/:id" element={<TournamentDetails />} />
        <Route path="/tournaments/:filter/:id/team-register" element={<TeamRegisterForm  />} />
        <Route path="/tournaments/:filter/:id/book-ticket" element={<BookingForm  />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/sports/:sportName" element={<FilteredSports />} />
        <Route path="/sports/:sportName/:id" element={<TournamentDetails />} />

        <Route path="/cities" element={<Cities />} />
        <Route path="/Cities/:cityName" element={<FilteredCities />} />
        <Route path="/Cities/:cityName/:id" element={<TournamentDetails />} />

        <Route path="/login" element={<Login/>} />
        <Route path="/venue-admin-dashboard/:id" element={<VenueAdminDashboard />} />
        <Route path="/venue-admin-dashboard/:id/profile" element={<Profile />} />
        <Route path="/venue-admin-dashboard/:id/your-tournaments" element={<YourTournaments />} />
        <Route path="/venue-admin-dashboard/:id/your-tournaments/detail/:id" element={<YourTournamentsDetail />} />
        <Route path="/venue-admin-dashboard/:id/create-tournament" element={<CreateTournament />} /> 
        {/* <Route path="*" element={<Navigate to="/venue-admin-dashboard/:id" replace />} /> */}
        <Route path="/register" element= {<Register/>} />
      </Routes>
      {/* <Footer></Footer> */}
    </>
  );
};

export default App;
