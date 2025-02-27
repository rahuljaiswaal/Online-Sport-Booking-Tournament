import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import Sports from "./sports/Sports";
import Cities from "./cities/Cities";
import Footer from "./shared/Footer";
const Hero = () => {
  const { user } = useContext(ApiContext);
  
  return (
    <>
    <div className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="text-blue-600 6xl sm:text-6xl font-bold mb-4">
          Welcome to the Ultimate Sports Arena!
        </h1>
        <p className="text-lg sm:text-xl text-blue-600 mb-6">
          Book venues, register for tournaments, and experience the thrill of competition like never before.
        </p>

        {/* Call-To-Action Buttons */}
        {(!user || user.role === "user") &&
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition">
              Register Now
            </NavLink>
            <NavLink to="/tournaments" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">
              Explore Tournaments
            </NavLink>
          </div>
        } 
      </div>
    </div>
    {(!user || user.role === "user") && 
    <div>
      <Sports></Sports>
      <Cities></Cities>
      </div>
    }
    {/* <Footer></Footer> */}
    </>
  );
};

export default Hero;
