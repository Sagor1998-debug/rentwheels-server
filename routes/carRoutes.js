import express from "express";
import {
  addCar,
  getAllCars,
  getCarById,
  getMyListings,
  updateCarStatus,
} from "../controllers/carController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

// ✅ Get all cars (homepage, etc.)
router.get("/", getAllCars);

// ✅ Get single car by ID
router.get("/:id", getCarById);

// ✅ Protected routes
router.post("/", verifyFirebaseToken, addCar);
router.get("/my-listings", verifyFirebaseToken, getMyListings);
router.put("/:id/status", verifyFirebaseToken, updateCarStatus);

export default router;
