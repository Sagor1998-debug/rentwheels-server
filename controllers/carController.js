// controllers/carController.js
import Car from "../models/Car.js";

/**
 * Add new car (protected)
 */
export const addCar = async (req, res) => {
  try {
    const { name, description, category, rentPrice, location, imageUrl } = req.body;

    const car = new Car({
      name,
      description,
      category,
      rentPrice,
      location,
      imageUrl,
      providerName: req.user.name,
      providerEmail: req.user.email,
    });

    await car.save();
    res.status(201).json({ message: "✅ Car added successfully", car });
  } catch (error) {
    res.status(500).json({ message: "❌ Adding car failed", error: error.message });
  }
};

/**
 * Get cars list (public) with optional query:
 * - ?search=term  (search by name)
 * - ?category=Sedan
 * - ?limit=6
 * - ?page=1
 */
export const getCars = async (req, res) => {
  try {
    const { search, category, limit = 0, page = 1 } = req.query;
    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;

    const perPage = Number(limit) || 0;
    const skip = perPage ? (Number(page) - 1) * perPage : 0;

    const carsQuery = Car.find(query).sort({ createdAt: -1 });
    if (perPage) carsQuery.skip(skip).limit(perPage);

    const cars = await carsQuery.exec();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetching cars failed", error: error.message });
  }
};

/**
 * Get featured cars (6 newest)
 */
export const getFeaturedCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetching featured cars failed", error: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetching car failed", error: error.message });
  }
};

/**
 * My listings (protected)
 */
export const getMyListings = async (req, res) => {
  try {
    const cars = await Car.find({ providerEmail: req.user.email })
      .sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching my listings:", error);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};

/**
 * Update car (protected: only owner)
 */
export const updateCarStatus = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.providerEmail !== req.user.email)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(car, req.body);
    await car.save();
    res.json({ message: "✅ Car updated", car });
  } catch (error) {
    res.status(500).json({ message: "❌ Update failed", error: error.message });
  }
};

// controllers/carController.js

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetching all cars failed", error: error.message });
  }
};


/**
 * Delete car (protected: only owner)
 */
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.providerEmail !== req.user.email)
      return res.status(403).json({ message: "Unauthorized" });

    await car.deleteOne();
    res.json({ message: "✅ Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Deletion failed", error: error.message });
  }
};

