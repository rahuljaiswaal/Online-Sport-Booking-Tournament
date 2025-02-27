import React from "react";
import { useNavigate } from "react-router-dom";
import { sportsData } from "./sportsData";

const Sports = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Sports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sportsData.map((sport, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
            onClick={() => navigate(`/sports/${sport.name.toLowerCase()}`)}
          >
            <div className="h-80 w-full">
              <img src={sport.photo} alt={sport.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{sport.name}</h2>
              {/* <p className="text-gray-600">Tournaments: {sport.totalTournaments}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
