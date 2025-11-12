import express from "express";
import {
  addCar,
  getCars,
  getFeaturedCars,
  getCarById,
  getMyListings,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

// ✅ Protected routes
router.post("/", verifyFirebaseToken, addCar);                 // Add car
router.get("/my-listings", verifyFirebaseToken, getMyListings); // My listings
router.put("/:id", verifyFirebaseToken, updateCar);           // Update car
router.delete("/:id", verifyFirebaseToken, deleteCar);        // Delete car

// ✅ Public routes (static routes before dynamic route)
router.get("/", getCars);                                     // Browse all cars
router.get("/featured", getFeaturedCars);                     // Featured cars
router.get("/:id", getCarById);                               // Get car by ID (dynamic, LAST)

export default router;
