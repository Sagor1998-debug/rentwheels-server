// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// 1. Home page 
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// 2. My Listings 
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const cars = await Car.find({ providerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

// 3. GET by ID - Car Details 
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

// 4. POST 
router.post("/", verifyFirebaseToken, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      rentPrice,
      location,
      imageUrl,
    } = req.body;

    //
    if (!name || !category || !rentPrice || !location || !imageUrl) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newCar = new Car({
      name,
      description: description || "",
      category,
      rentPrice: Number(rentPrice),
      location,
      imageUrl,
      providerName: req.user.name || req.user.email.split("@")[0],
      providerEmail: req.user.email,
      status: "available", 
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (error) {
    console.error("Add car error:", error);
    res.status(500).json({ message: "Failed to add car", error: error.message });
  }
});

// Update car
router.put("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.providerEmail !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});


router.delete("/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.providerEmail !== req.user.email) {
      return res.status(403).json({ message: "You can only delete your own car" });
    }

    await Car.deleteOne({ _id: req.params.id });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Delete car error:", error);
    res.status(500).json({ message: "Failed to delete car" });
  }
});

export default router;