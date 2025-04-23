// import React, {useContext} from "react";
// import { NavLink } from "react-router-dom";
// import { ApiContext } from "./context/ApiContext";
// import Sports from "./sports/Sports";
// import Cities from "./cities/Cities";
// import Footer from "./shared/Footer";
// const Hero = () => {
//   const { user } = useContext(ApiContext);
  
//   return (
//     <>
//     <div className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//       {/* Background Overlay */}
//       <div className="absolute inset-0 bg-white bg-opacity-50"></div>

//       <div className="relative z-10 px-6 max-w-4xl">
//         <h1 className="text-blue-600 6xl sm:text-6xl font-bold mb-4">
//           Welcome to the Ultimate Sports Arena!
//         </h1>
//         <p className="text-lg sm:text-xl text-blue-600 mb-6">
//           Book venues, register for tournaments, and experience the thrill of competition like never before.
//         </p>

//         {/* Call-To-Action Buttons */}
//         {(!user || user.role === "user") &&
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <NavLink to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition">
//               Register Now
//             </NavLink>
//             <NavLink to="/tournaments" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">
//               Explore Tournaments
//             </NavLink>
//           </div>
//         } 
//       </div>
//     </div>
//     {(!user || user.role === "user") && 
//     <div>
//       <Sports></Sports>
//       <Cities></Cities>
//       </div>
//     }
//     {/* <Footer></Footer> */}
//     </>
//   );
// };

// export default Hero;





import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import Sports from "./sports/Sports";
import Cities from "./cities/Cities";

const Hero = () => {
  const { user } = useContext(ApiContext);

  return (
    <>
      <div className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        {/* Background Animated Circles */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full animate-ping left-10 top-10"></div>
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full animate-pulse right-10 bottom-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to the <br />
            <span className="text-yellow-300">Ultimate Sports Arena!</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white font-medium">
            Book venues, register for tournaments, and experience the thrill of competition like never before.
          </p>

          {/* Call-To-Action Buttons */}
          {(!user || user.role === "user") && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg transition"
              >
                Register Now
              </NavLink>
              <NavLink
                to="/tournaments"
                className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 shadow-lg transition"
              >
                Explore Tournaments
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Show sports and cities section if not venue admin */}
      {(!user || user.role === "user") && (
        <div>
          <Sports />
          <Cities />
        </div>
      )}
    </>
  );
};

export default Hero;
