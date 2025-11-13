import express from "express";
import {
  bookCar,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookCar);
router.get("/my-bookings", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);

export default router;
