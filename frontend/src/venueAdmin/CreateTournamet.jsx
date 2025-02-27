import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { toast } from "react-toastify";

const CreateTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createTournament } = useContext(ApiContext);

  const [formData, setFormData] = useState({
    name: "",
    sportType: "",
    sportName: "",
    maxTeams: "",
    startDate: "",
    endDate: "",
    venue: "",
    cityType: "",
    cityName: "",
    maxFansAllowed: "",
    RegistrationLastDate: "",
    EntryFee: "",
    TicketFee: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Reset validation errors on input change
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate the form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Tournament name is required";
    if (!formData.sportType) newErrors.sportType = "Sport type is required";
    if (formData.sportType === "others" && !formData.sportName)
      newErrors.sportName = "Please specify the sport";
    if (!formData.maxTeams || formData.maxTeams < 4 || formData.maxTeams > 24)
      newErrors.maxTeams = "Max teams allowed: 4-24";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.cityType) newErrors.cityType = "City is required";
    if (formData.cityType === "others" && !formData.cityName)
      newErrors.cityName = "Please specify the city";
    if (!formData.maxFansAllowed)
      newErrors.maxFansAllowed = "This field is required";
    if (!formData.RegistrationLastDate)
      newErrors.RegistrationLastDate = "Required";
    if (!formData.EntryFee) newErrors.entryFee = "Entry fee is required";
    if (!formData.TicketFee) newErrors.ticketFee = "Ticket fee is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    if (validateForm()) {
      try {
        const result = await createTournament(formData);
        if (result?.success) {
          // alert("Tournament Created Successfully!");
          toast.success("Tournament Created succesfully");
          // Optionally navigate to another page after creation
          // navigate(`/your-tournaments/${result.data.id}`);
        }
      } catch (error) {
        // Handle any errors returned by the API call
        console.error("Error creating tournament:", error);
        toast.error("faild to create tournament try once again")
        // alert("There was an error creating the tournament.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Create Tournament</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Tournament Name */}
          <div>
            <label className="block text-gray-700 font-medium">Tournament Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Sport Type */}
          <div>
            <label className="block text-gray-700 font-medium">Sport Type</label>
            <select
              name="sportType"
              value={formData.sportType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Sport</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="badminton">Badminton</option>
              <option value="others">Others</option>
            </select>
            {errors.sportType && <p className="text-red-500 text-sm">{errors.sportType}</p>}
          </div>

          {/* Other Sport (If selected) */}
          {formData.sportType === "others" && (
            <div>
              <label className="block text-gray-700 font-medium">Sport Name</label>
              <input
                type="text"
                name="sportName"
                value={formData.sportName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.sportName && <p className="text-red-500 text-sm">{errors.sportName}</p>}
            </div>
          )}

          {/* Max Teams */}
          <div>
            <label className="block text-gray-700 font-medium">Max Teams (4-24)</label>
            <input
              type="number"
              name="maxTeams"
              value={formData.maxTeams}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.maxTeams && <p className="text-red-500 text-sm">{errors.maxTeams}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 font-medium">Start Date</label>
            <input 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 font-medium">End Date</label>
            <input 
              type="date" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md" 
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          </div>

          {/* Venue */}
          <div>
            <label className="block text-gray-700 font-medium">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.venue && <p className="text-red-500 text-sm">{errors.venue}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium">City</label>
            <select
              name="cityType"
              value={formData.cityType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select City</option>
              <option value="mumbai">Mumbai</option>
              <option value="chennai">Chennai</option>
              <option value="patna">Patna</option>
              <option value="delhi">Delhi</option>
              <option value="banglore">Bangalore</option>
              <option value="others">Others</option>
            </select>
            {errors.cityType && <p className="text-red-500 text-sm">{errors.cityType}</p>}
          </div>

          {/* Other City (If selected) */}
          {formData.cityType === "others" && (
            <div>
              <label className="block text-gray-700 font-medium">City Name</label>
              <input
                type="text"
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.cityName && <p className="text-red-500 text-sm">{errors.cityName}</p>}
            </div>
          )}

          {/* Additional Fields */}
          <div>
            <label className="block text-gray-700 font-medium">Max Fans Allowed</label>
            <input
              type="number"
              name="maxFansAllowed"
              value={formData.maxFansAllowed}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.maxFansAllowed && <p className="text-red-500 text-sm">{errors.maxFansAllowed}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Registration Last Date</label>
            <input
              type="date"
              name="RegistrationLastDate"
              value={formData.RegistrationLastDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.lastDateOfRegistration && <p className="text-red-500 text-sm">{errors.lastDateOfRegistration}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Entry Fee</label>
            <input
              type="number"
              name="EntryFee"
              value={formData.entryFee}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.entryFee && <p className="text-red-500 text-sm">{errors.entryFee}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Ticket Fee</label>
            <input
              type="number"
              name="TicketFee"
              value={formData.ticketFee}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.ticketFee && <p className="text-red-500 text-sm">{errors.ticketFee}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;

