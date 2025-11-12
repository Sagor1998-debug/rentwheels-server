import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import verifyFirebaseToken from "./middlewares/verifyFirebaseToken.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Public routes
app.use("/api/auth", authRoutes);

// ✅ Car routes (some routes protected by Firebase token)
app.use("/api/cars", carRoutes);

// ✅ Booking routes (protected by JWT token)
app.use("/api/bookings", bookingRoutes);

// ✅ Test server
app.get("/", (req, res) => res.send("🚗 RentWheels Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
