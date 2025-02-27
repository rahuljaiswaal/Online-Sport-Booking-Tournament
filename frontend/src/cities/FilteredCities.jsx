// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// // import { tournaments } from "../tournaments/tournaments";
// import TournamentCard from "../tournaments/TournamentCard";
// import { citiesData } from "./citiesData";
// import { ApiContext } from "../context/ApiContext";

// // List of allowed cities
// const allowedCities = ["mumbai", "chennai", "patna", "delhi","banglore"];

// const FilteredCities = () => {
//   const { cityName } = useParams();
//   const { tournaments, fetchTournaments, loading } = useContext(ApiContext);

//   useEffect(() => {
//           const loadTournaments = async () => {
//             await fetchTournaments();
//           };
//           loadTournaments();
//         }, [fetchTournaments]);
  

//   // Normalize city name to lowercase
//   const normalizedCityName = cityName//.toLowerCase();

//   // Check if the city is in the allowed list; otherwise, default to "others"
//   const cityToFilter = allowedCities.includes(normalizedCityName) ? normalizedCityName : "others";

//   // **Filter tournaments correctly**
//   const filteredTournaments = tournaments.filter((tournament) => {
//     const tournamentCity = tournament.city.toLowerCase();

//     if (cityToFilter === "others") {
//       // If city is NOT in allowedCities, put it in "Others"
//       return !allowedCities.includes(tournamentCity);
//     }

//     // Otherwise, only show tournaments matching the city
//     return tournamentCity === cityToFilter;
//   });

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6 capitalize">
//         {cityToFilter.charAt(0).toUpperCase() + cityToFilter.slice(1)} Tournaments
//       </h1>
//       {filteredTournaments.length > 0 ? (
//         <div className="grid md:grid-cols-3 gap-4">
//           {filteredTournaments.map((tournament) => (
//             <TournamentCard key={tournament._id} tournament={tournament} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No tournaments found.</p>
//       )}
//     </div>
//   );
// };

// export default FilteredCities;


















import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TournamentCard from "../tournaments/TournamentCard";
import { ApiContext } from "../context/ApiContext";

const FilteredCities = () => {
  const { cityName } = useParams();
  const { tournaments, fetchTournaments, loading } = useContext(ApiContext);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await fetchTournaments();
    };
    loadData();
  }, [fetchTournaments]);

  useEffect(() => {
    if (tournaments && tournaments.length > 0) {
      const target = cityName ? cityName.toLowerCase() : "";
      const filtered = tournaments.filter((tournament) => {
        // Safely get cityType and cityName
        const ct = tournament.cityType ? tournament.cityType.toLowerCase() : "";
        const cn = tournament.cityName ? tournament.cityName.toLowerCase() : "";
        // Return true if either cityType or cityName matches the target
        return target === ct || target === cn;
      });
      setFilteredTournaments(filtered);
    }
  }, [cityName, tournaments]);

  if (loading) return <p>Loading tournaments...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{cityName} Tournaments</h2>
      {filteredTournaments.length === 0 ? (
        <p>No tournaments found for {cityName}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament._id} tournament={tournament} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredCities;
