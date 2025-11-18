// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// (Home page)
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

//  My Listings 
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const cars = await Car.find({ providerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    console.error("Error fetching car by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;