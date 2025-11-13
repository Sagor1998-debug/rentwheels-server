import express from "express";
import {
  addCar,
  getAllCars,
  getMyListings,
  updateCarStatus,
  deleteCar,
  getCarById,
} from "../controllers/carController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllCars);
router.get("/:id", getCarById);

// Private
router.post("/", protect, addCar);
router.get("/my-listings", protect, getMyListings);
router.put("/:id/status", protect, updateCarStatus);
router.delete("/:id", protect, deleteCar);

export default router;
