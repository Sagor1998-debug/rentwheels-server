// routes/bookingRoutes.js
import express from "express";
import { bookCar, getMyBookings, cancelBooking } from "../controllers/bookingController.js";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// ✅ Firebase Auth protected routes
router.post("/", verifyFirebaseToken, bookCar);
router.get("/my-bookings", verifyFirebaseToken, getMyBookings);
router.delete("/:id", verifyFirebaseToken, cancelBooking);

export default router;
