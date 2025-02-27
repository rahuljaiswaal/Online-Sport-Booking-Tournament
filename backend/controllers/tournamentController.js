import Tournament from "../models/Tournament.js";

// ✅ Create a new tournament
export const createTournament = async (req, res) => {
  try {
    const {
      name,
      sportType,
      sportName,
      cityType,
      cityName,
      teams,
      startDate,
      endDate,
      venue,
      maxFansAllowed,
      RegistrationLastDate,
      EntryFee,
      TicketFee,
      maxTeams,
    } = req.body;

    // Ensure only venue admins can create a tournament
    if (req.user.role !== "venue_admin") {
      return res.status(403).json({ message: "Only venue admins can create tournaments." });
    }

    // const organizer = req.user._id;
    const tournament = new Tournament({
      name,
      sportType,
      sportName, // if sportType is "others", should be provided
      cityType,
      cityName,  // if cityType is "others", should be provided
      teams,
      startDate,
      endDate,
      venue,
      maxFansAllowed,
      RegistrationLastDate,
      EntryFee,
      TicketFee,
      organizer: req.user._id,
      maxTeams,
    });

    await tournament.save();
    res.status(201).json({ message: "Tournament created successfully", tournament });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating tournament", error });
  }
};

// ✅ Get all tournaments
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("organizer", "name email");
    res.status(200).json({tournaments: tournaments});
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournaments", error });
  }
};

// ✅ Get a single tournament by ID
export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate("organizer", "name email");
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json( tournament );
  } catch (error) {
    res.status(500).json({ message: "Error fetching tournament", error });
  }
};

// ✅ Update a tournament
export const updateTournament = async (req, res) => {
  try {
    const {
      name,
      sportType,
      sportName,
      cityType,
      cityName,
      teams,
      startDate,
      endDate,
      venue,
      maxFansAllowed,
      RegistrationLastDate,
      EntryFee,
      TicketFee,
      maxTeams,
    } = req.body;

    // Ensure only the creator (venue admin) can update it
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own tournaments" });
    }

    // Update tournament details
    tournament.name = name || tournament.name;
    tournament.sportType = sportType || tournament.sportType;
    tournament.sportName = sportName || tournament.sportName;
    tournament.cityType = cityType || tournament.cityType;
    tournament.cityName = cityName || tournament.cityName;
    tournament.teams = teams || tournament.teams;
    tournament.startDate = startDate || tournament.startDate;
    tournament.endDate = endDate || tournament.endDate;
    tournament.venue = venue || tournament.venue;
    tournament.maxFansAllowed = maxFansAllowed || tournament.maxFansAllowed;
    tournament.RegistrationLastDate = RegistrationLastDate || tournament.RegistrationLastDate;
    tournament.EntryFee = EntryFee || tournament.EntryFee;
    tournament.TicketFee = TicketFee || tournament.TicketFee;
    tournament.maxTeams = maxTeams || tournament.maxTeams;

    await tournament.save();
    res.status(200).json({ message: "Tournament updated successfully", tournament });
  } catch (error) {
    res.status(500).json({ message: "Error updating tournament", error });
  }
};

// ✅ Delete a tournament
export const deleteTournament = async (req, res) => {
  try {
    // Ensure only the creator (venue admin) can delete it
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own tournaments" });
    }

    await Tournament.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tournament", error });
  }
};

