import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

// GET ALL CARS (public)
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// GET my listings
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const cars = await Car.find({ ownerEmail: req.user.email });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

export default router;
