// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carName: String,
    userEmail: String,
    userName: String,
    providerEmail: String,
    rentPrice: Number,
    startDate: String,
    endDate: String,
    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
