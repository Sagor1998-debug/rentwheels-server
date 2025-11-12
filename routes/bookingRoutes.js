import express from "express";
import {
  bookCar,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

// ✅ Protected booking routes
router.post("/", verifyFirebaseToken, bookCar);           // Book a car
router.get("/my-bookings", verifyFirebaseToken, getMyBookings); // My bookings
router.delete("/:id", verifyFirebaseToken, cancelBooking);      // Cancel booking

export default router;
