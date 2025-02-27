import express from 'express';
import dotend from 'dotenv';
// const cors = require("cors");
// const morgan = require("morgan");
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './utils/db.js';
import authRoutes from "./routes/authRoutes.js";
import tournamentRoutes from "./routes/tournamentRoutes.js";
import teamRoutes from "./routes/teamRoutes.js"; 
import bookingRoutes from "./routes/bookingRoutes.js"

dotend.config({});

const app = express();

app.use(express.json()); // app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/teams", teamRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running onnn port', PORT);
    });