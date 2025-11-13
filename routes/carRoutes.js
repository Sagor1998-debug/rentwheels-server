// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

// Get cars posted by the logged-in user
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const email = req.user.email; // From Firebase token
    const cars = await Car.find({ ownerEmail: email });
    res.json(cars);
  } catch (error) {
    console.error("Fetching my listings failed:", error);
    res.status(500).json({ message: "Failed to fetch your listings." });
  }
});

// Delete car
router.delete("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: "You cannot delete this car." });
    }

    await car.deleteOne();
    res.json({ message: "Car deleted successfully!" });
  } catch (error) {
    console.error("Deleting car failed:", error);
    res.status(500).json({ message: "Failed to delete car." });
  }
});

export default router;
