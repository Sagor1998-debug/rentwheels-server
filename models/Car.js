// models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    rentPrice: { type: Number, required: true },
    imageUrl: { type: String },
    ownerEmail: { type: String },
    location: { type: String },
    status: { type: String, default: "available" }, // ✅ important field
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
