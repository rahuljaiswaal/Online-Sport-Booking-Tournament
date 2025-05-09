// import React, { useState, useContext } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { ApiContext } from "../context/ApiContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const { user, logoutUser } = useContext(ApiContext);
//   const navigate = useNavigate();
//   const {id} = useParams();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleChangeButton = () => {
//     if (user.role === "user") { 
//       navigate(`/user-profile/${user.id}`);
//     } else if (user.role === "venue_admin") { 
//       navigate(`/venue-admin-dashboard/${user.id}/profile`);
//     }
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         {/* {!user && ( */}
//         <NavLink to="/" className="text-xl font-bold">
//           SportsHub
//         </NavLink>
//         {/* )} */}

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden block text-white focus:outline-none"
//           onClick={toggleMenu}
//         >
//           ☰
//         </button>

//         {/* Navbar Links */}
//         <div
//           className={`md:flex md:items-center md:space-x-6 absolute md:static bg-blue-600 w-full md:w-auto top-16 left-0 md:flex-row flex-col p-4 md:p-0 transition-all ${
//             isOpen ? "block" : "hidden"
//           }`}
//         >
//           {user && user.role === "venue_admin" ? (
//             <>
//             <NavLink to={`/venue-admin-dashboard/${user.id}`} className="px-3 py-2 cursor-pointer">
//               Dashboard
//             </NavLink>
//             <NavLink to={`/venue-admin-dashboard/${user.id}/your-tournaments`} className="px-3 py-2 cursor-pointer">
//             Your Tournaments
//           </NavLink>
//           <NavLink to={`/venue-admin-dashboard/${user.id}/create-tournament`} className="px-3 py-2 cursor-pointer">
//             Create Tournament
//           </NavLink>
//           </>
//           ) : (
//             <>
//             <NavLink to="/tournaments" className="px-3 py-2 cursor-pointer">
//             Tournaments
//           </NavLink>
//           <NavLink to="/sports" className="px-3 py-2 cursor-pointer">
//             Sports
//           </NavLink>
//           <NavLink to="/cities" className="px-3 py-2 cursor-pointer">
//             Cities
//           </NavLink>
//           </>
//           )}
//           {/* <NavLink to="/tournaments" className="px-3 py-2 cursor-pointer">
//             Tournaments
//           </NavLink>
//           <NavLink to="/sports" className="px-3 py-2 cursor-pointer">
//             Sports
//           </NavLink>
//           <NavLink to="/cities" className="px-3 py-2 cursor-pointer">
//             Cities
//           </NavLink> */}

//           {/* If user is not logged in */}
//           {!user ? (
//             <>
//               <NavLink
//                 to="/login"
//                 className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
//               >
//                 Register
//               </NavLink>
//             </>
//           ) : (
//             // Profile Dropdown that opens on hover and on click navigates to profile page
//             <div
//               className="relative"
//               onMouseEnter={() => setProfileOpen(true)}
//               onMouseLeave={() => setProfileOpen(false)}
//             >
//               <button
//                 onClick={handleChangeButton}
//                 className="flex items-center space-x-2 px-3 py-2 cursor-pointer bg-white text-blue-600 rounded-md"
//               >
//                 <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//                 <span>{user.name}</span>
//               </button>
//               {profileOpen && (
//                 user.role === "user" ? (
//                   // <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
//                   <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">

//                     <NavLink
//                       to={`/user-profile/${user.id}`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Profile
//                     </NavLink>
//                     <NavLink
//                       to={`/user-profile/${user?.id}/participated-tournaments`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Participated Tournaments
//                     </NavLink>
//                     <NavLink
//                       to={`/user-profile/${user?.id}/your-tickets`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Your Tickets
//                     </NavLink>
//                     <button
//                       onClick={logoutUser}
//                       className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
//                     <NavLink
//                       to={`/venue-admin-dashboard/${user.id}/profile`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Profile
//                     </NavLink>
                    
//                     <NavLink
//                       to={`/venue-admin-dashboard/${user.id}`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Venue Admin Dashboard
//                     </NavLink>
//                     <NavLink
//                       to={`/venue-admin-dashboard/${user.id}/your-tournaments`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Your Tournaments
//                     </NavLink>

//                     <NavLink
//                       to={`/venue-admin-dashboard/${user.id}/create-tournament`}
//                       className="block px-4 py-2 hover:bg-gray-200"
//                     >
//                       Create Tournament
//                     </NavLink>
                    
//                     <button
//                       onClick={logoutUser}
//                       className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;









import React, { useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logoutUser } = useContext(ApiContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeButton = () => {
    if (user.role === "user") {
      navigate(`/user-profile/${user.id}`);
    } else if (user.role === "venue_admin") {
      navigate(`/venue-admin-dashboard/${user.id}/profile`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          SportsHub
        </NavLink>

        {/* Toggle Button */}
        <div className="md:hidden z-50">
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {user && user.role === "venue_admin" ? (
            <>
              <NavLink to={`/venue-admin-dashboard/${user.id}`} className="hover:underline">
                Dashboard
              </NavLink>
              <NavLink to={`/venue-admin-dashboard/${user.id}/your-tournaments`} className="hover:underline">
                Your Tournaments
              </NavLink>
              <NavLink to={`/venue-admin-dashboard/${user.id}/create-tournament`} className="hover:underline">
                Create Tournament
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/tournaments" className="hover:underline">
                Tournaments
              </NavLink>
              <NavLink to="/sports" className="hover:underline">
                Sports
              </NavLink>
              <NavLink to="/cities" className="hover:underline">
                Cities
              </NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                Login
              </NavLink>
              <NavLink to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                Register
              </NavLink>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                onClick={handleChangeButton}
                className="flex items-center space-x-2 px-3 py-2 bg-white text-blue-600 rounded-md"
              >
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
                  {user.role === "user" ? (
                    <>
                      <NavLink to={`/user-profile/${user.id}`} className="block px-4 py-2 hover:bg-gray-200">Profile</NavLink>
                      <NavLink to={`/user-profile/${user.id}/participated-tournaments`} className="block px-4 py-2 hover:bg-gray-200">Participated Tournaments</NavLink>
                      <NavLink to={`/user-profile/${user.id}/your-tickets`} className="block px-4 py-2 hover:bg-gray-200">Your Tickets</NavLink>
                      <button onClick={logoutUser} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Logout</button>
                    </>
                  ) : (
                    <>
                      <NavLink to={`/venue-admin-dashboard/${user.id}/profile`} className="block px-4 py-2 hover:bg-gray-200">Profile</NavLink>
                      <NavLink to={`/venue-admin-dashboard/${user.id}`} className="block px-4 py-2 hover:bg-gray-200">Dashboard</NavLink>
                      <NavLink to={`/venue-admin-dashboard/${user.id}/your-tournaments`} className="block px-4 py-2 hover:bg-gray-200">Your Tournaments</NavLink>
                      <NavLink to={`/venue-admin-dashboard/${user.id}/create-tournament`} className="block px-4 py-2 hover:bg-gray-200">Create Tournament</NavLink>
                      <button onClick={logoutUser} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-start space-y-4 px-6 py-4 z-40">
          {user && user.role === "venue_admin" ? (
            <>
              <NavLink to={`/venue-admin-dashboard/${user.id}`} className="w-full py-2 border-b border-blue-500">Dashboard</NavLink>
              <NavLink to={`/venue-admin-dashboard/${user.id}/your-tournaments`} className="w-full py-2 border-b border-blue-500">Your Tournaments</NavLink>
              <NavLink to={`/venue-admin-dashboard/${user.id}/create-tournament`} className="w-full py-2 border-b border-blue-500">Create Tournament</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/tournaments" className="w-full py-2 border-b border-blue-500">Tournaments</NavLink>
              <NavLink to="/sports" className="w-full py-2 border-b border-blue-500">Sports</NavLink>
              <NavLink to="/cities" className="w-full py-2 border-b border-blue-500">Cities</NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="w-full py-2 bg-white text-blue-600 text-center rounded hover:bg-gray-100">Login</NavLink>
              <NavLink to="/register" className="w-full py-2 bg-white text-blue-600 text-center rounded hover:bg-gray-100">Register</NavLink>
            </>
          ) : (
            <>
              {user.role === "user" ? (
                <>
                  <NavLink to={`/user-profile/${user.id}`} className="w-full py-2 border-b border-blue-500">Profile</NavLink>
                  <NavLink to={`/user-profile/${user.id}/participated-tournaments`} className="w-full py-2 border-b border-blue-500">Participated Tournaments</NavLink>
                  <NavLink to={`/user-profile/${user.id}/your-tickets`} className="w-full py-2 border-b border-blue-500">Your Tickets</NavLink>
                </>
              ) : (
                <>
                  <NavLink to={`/venue-admin-dashboard/${user.id}/profile`} className="w-full py-2 border-b border-blue-500">Profile</NavLink>
                  <NavLink to={`/venue-admin-dashboard/${user.id}`} className="w-full py-2 border-b border-blue-500">Dashboard</NavLink>
                  <NavLink to={`/venue-admin-dashboard/${user.id}/your-tournaments`} className="w-full py-2 border-b border-blue-500">Your Tournaments</NavLink>
                  <NavLink to={`/venue-admin-dashboard/${user.id}/create-tournament`} className="w-full py-2 border-b border-blue-500">Create Tournament</NavLink>
                </>
              )}
              <button onClick={logoutUser} className="w-full py-2 text-red-500 hover:bg-red-100 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

