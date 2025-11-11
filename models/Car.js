// models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback", "Luxury", "Electric"],
      required: true,
    },
    rentPrice: { type: Number, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    providerName: { type: String, required: true },
    providerEmail: { type: String, required: true },
    status: { type: String, enum: ["Available", "Booked"], default: "Available" },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
