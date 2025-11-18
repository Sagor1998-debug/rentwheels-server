// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js"; // ← এটা ঠিক আছে

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const cars = await Car.find({ providerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

export default router;