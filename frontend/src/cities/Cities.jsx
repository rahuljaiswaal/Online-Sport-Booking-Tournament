import React from "react";
import { useNavigate } from "react-router-dom";
import { citiesData } from "./citiesData";

const Cities = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {citiesData.map((city, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
            onClick={() => navigate(`/cities/${city.city.toLowerCase()}`)}
          >
            <div className="h-80 w-full">
              <img src={city.image} alt={city.city} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{city.city}</h2>
              {/* <p className="text-gray-600">Tournaments: {city.totalTournaments}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
