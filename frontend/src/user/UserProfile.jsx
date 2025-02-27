import React from "react";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { NavLink, useParams } from "react-router-dom";

const UserProfile = () => {
  const { user, logoutUser } = useContext(ApiContext);
  const {id} = useParams();

  if (!user) {
    return <p className="text-center text-red-600">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg text-center">
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* User Details */}
      <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">Profile ID: {user.id}</p>

      {/* Action Buttons */}
      <div className="mt-6 space-y-4">
        <NavLink to={`/user-profile/${id}/participated-tournaments`} className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Participated Tournaments
        </NavLink>
        <NavLink to={`/user-profile/${id}/your-tickets`} className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Your Tickets
        </NavLink>
        <button onClick={logoutUser} className="block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
