// routes/carRoutes.js
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
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addCar);            // Add car (private)
router.get("/", getCars);                     // Browse cars (public) with query
router.get("/featured", getFeaturedCars);     // Get 6 featured cars
router.get("/my-listings", protect, getMyListings); // Provider listings
router.get("/:id", getCarById);               // Get car by ID
router.put("/:id", protect, updateCar);       // Update car (private)
router.delete("/:id", protect, deleteCar);    // Delete car (private)

export default router;
