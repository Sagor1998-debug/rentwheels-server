// models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    rentPrice: { type: Number, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },

    providerName: { type: String, required: true },
    providerEmail: { type: String, required: true },   

    status: { 
      type: String, 
      enum: ["available", "unavailable"], 
      default: "available" 
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;