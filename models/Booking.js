// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carName: { type: String, required: true },
    category: { type: String, required: true },       // added
    providerName: { type: String, required: true },   // added
    providerEmail: { type: String, required: true },
    rentPrice: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
