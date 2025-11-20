// index.js (or server.js)
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// Fix for ES modules + __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS – Allow Vercel, Render, and localhost
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://rentwheels.vercel.app",           // Your Vercel frontend
      "https://rentwheels-server-mks.vercel.app", // Your Vercel backend (if needed)
      // Add more Vercel preview URLs here if you use them
    ],
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded images (public folder)
app.use("/public", express.static(path.join(__dirname, "public")));

// API Routes 
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// Root + Health Check (VERY IMPORTANT FOR VERCEL!)
app.get("/api", (req, res) => {
  res.json({
    message: "RentWheels API is LIVE on Vercel!",
    status: "success",
    endpoints: ["/api/cars", "/api/bookings", "/api/auth"],
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({ message: "RentWheels Backend Running on Vercel!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));



export default app;   

// Only run app.listen() when running locally 
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}