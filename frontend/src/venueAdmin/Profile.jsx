import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";

const Profile = () => {
  const { user, fetchUserProfile, logoutUser } = useContext(ApiContext); // Getting user from context
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const locateRoute = "http://localhost:5000"; // ✅ Fix: Add 'http://'

  useEffect(() => {
    // console.log("User from context:", user);
    
    if (!user || !user.id) {
      console.warn("User not found in context, redirecting...");
      navigate("/login");
      return;
    }

    // Fetch full profile details
    fetchUserProfile();
    setProfileData(user);
  }, []);

  if (!profileData) {
    return <p className="text-center mt-10">Loading profile data...</p>;
  }

  return (
    <>
      {/* <VenueAdminNavbar id={profileData._id} /> */}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full mb-4">
            {profileData.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">ID</label>
              <input
                type="text"
                value={profileData.id}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={profileData.name}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={profileData.email}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Role</label>
              <input
                type="text"
                value={profileData.role}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 font-medium">Total Tournaments Created</label>
              <input
                type="text"
                value={profileData.totalTournaments}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
              Change Password
            </button> */}
          </form>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => navigate(`/venue-admin-dashboard/${user.id}/your-tournaments`)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              View Your Tournaments
            </button>
            <button
              onClick={() => navigate(`/venue-admin-dashboard/${profileData._id}/create-tournament`)}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Create Tournament
            </button>
            <button
              onClick={logoutUser}//() => navigate("/login")}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
























