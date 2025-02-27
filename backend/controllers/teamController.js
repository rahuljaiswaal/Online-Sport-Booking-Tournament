// import Team from "../models/Team.js";
import Tournament from "../models/Tournament.js";
import Team from "../models/Team.js";

// ✅ Register a team for a tournament
export const registerTeam = async (req, res) => {
  try {
    const { teamName, captainName, captainPhone, captainEmail, tournamentId } = req.body;

    // Check if the tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Check if the maximum team limit is reached
    if (tournament.teams.length >= tournament.maxTeams) {
      return res.status(400).json({ message: "Tournament team limit reached" });
    }

    // Create new team
    const team = new Team({
      teamName,
      captainName,
      captainPhone,
      captainEmail,
      userId: req.user._id, // User who registered the team
      tournamentId,
    });

    // Save team and add to tournament's team list
    await team.save();
    tournament.teams.push(team._id);
    await tournament.save();

    res.status(201).json({ message: "Team registered successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Error registering team", error });
  }
};

// ✅ Get all teams for a tournament
export const getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await Team.find({ tournamentId }).populate("userId", "name email");
    res.status(200).json({ teams : teams});
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

// ✅ Approve or Reject a team (only venue admin can do this)
export const updateTeamStatus = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Get tournament details
    const tournament = await Tournament.findById(team.tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    // // Ensure only the tournament's organizer can approve/reject teams
    // if (tournament.organizer.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Only the organizer can update team status" });
    // }

    // Update team status
    team.status = status;
    await team.save();

    res.status(200).json({ message: `Team ${status} successfully`, team });
  } catch (error) {
    res.status(500).json({ message: "Error updating team status", error });
  }
};

// export const updateTeamStatus = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { status } = req.body; // Expected: "approved" or "rejected"

//     // Ensure user is authenticated
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: No user found in request" });
//     }

//     // Validate status
//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     // Find the team
//     const team = await Team.findById(teamId);
//     if (!team) {
//       return res.status(404).json({ message: "Team not found" });
//     }

//     // Ensure team has a tournament ID
//     if (!team.tournamentId) {
//       return res.status(400).json({ message: "Team does not have a valid tournament ID" });
//     }

//     // Find the tournament
//     const tournament = await Tournament.findById(team.tournamentId);
//     if (!tournament) {
//       return res.status(404).json({ message: "Tournament not found" });
//     }

//     // Ensure only the organizer can update the team status
//     if (tournament.organizer.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Only the organizer can update team status" });
//     }

//     // Avoid redundant updates
//     if (team.status === status) {
//       return res.status(200).json({ message: `Team is already ${status}`, team });
//     }

//     // Update team status
//     team.status = status;
//     await team.save();

//     res.status(200).json({ message: `Team ${status} successfully`, team });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating team status", error: error.message });
//   }
// };




// ✅ Get all teams registered by a user
// export const getTeamsByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Received userId:", userId);  // Debugging line

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find all teams where userId matches
//     const teams = await Team.find({ userId }).populate("tournamentId", "name date");

//     if (teams.length === 0) {
//       return res.status(404).json({ message: "No teams found for this user" });
//     }

//     res.status(200).json({ teams });
//   } catch (error) {
//     console.error("Error fetching teams:", error.message);
//     res.status(500).json({ message: "Error fetching teams", error: error.message });
//   }
// };







export const getTeamsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const teams = await Team.find({ userId }).populate("tournamentId");
    

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found for this user" });
    }

    res.status(200).json( {teams} );
  } catch (error) {
    console.error("❌ Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

