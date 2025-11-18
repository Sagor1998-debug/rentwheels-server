// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js"; // Make sure path is correct

const router = express.Router();

// GET ALL CARS (public)
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// GET MY LISTINGS (only logged-in user)
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    // VERY IMPORTANT: Use "providerEmail" NOT "ownerEmail"
    const cars = await Car.find({ providerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    console.error("Error in my-listings:", error);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

// You can add more routes later (add, update, delete)

export default router;