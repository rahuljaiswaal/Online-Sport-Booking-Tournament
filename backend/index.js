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
import path from 'path';

dotend.config({});

const app = express();

const __dirname = path.resolve(); // __dirname is not defined in ES modules

app.use(express.json()); // app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/teams", teamRoutes); 


app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running onnn port', PORT);
    });