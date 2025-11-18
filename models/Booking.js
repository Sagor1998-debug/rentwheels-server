// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",           // 
      required: true,
    },
    userEmail: { type: String, required: true },
    userName: { type: String },

    // 
    carName: { type: String, required: true },
    category: { type: String },
    rentPrice: { type: Number, required: true },
    imageUrl: { type: String },
    providerName: { type: String, required: true },
    providerEmail: { type: String, required: true },

    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;