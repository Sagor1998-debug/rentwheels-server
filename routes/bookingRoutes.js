// routes/bookingRoutes.js
import express from "express";
import { bookCar, getMyBookings, cancelBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookCar);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking); // cancel booking

export default router;
