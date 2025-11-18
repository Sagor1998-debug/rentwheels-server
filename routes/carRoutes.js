// routes/carRoutes.js
import express from "express";
import Car from "../models/Car.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// 1. Home page - সব গাড়ি দেখাবে
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// 2. My Listings - নিজের গাড়ি দেখাবে
router.get("/my-listings", verifyFirebaseToken, async (req, res) => {
  try {
    const cars = await Car.find({ providerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
});

// 3. GET by ID - Car Details পেজ
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

// 4. POST - নতুন গাড়ি যোগ করা (এটাই মিসিং ছিল!)
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

    // বাধ্যতামূলক ফিল্ড চেক
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
      status: "available", // ছোট হাতের!
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (error) {
    console.error("Add car error:", error);
    res.status(500).json({ message: "Failed to add car", error: error.message });
  }
});

// 5. DELETE - গাড়ি ডিলিট (MyListings থেকে)
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