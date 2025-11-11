// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
