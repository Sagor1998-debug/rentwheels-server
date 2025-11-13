import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static images
app.use("/public", express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("🚗 RentWheels Server is Running...");
});

// 🔹 Start server (local and Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
