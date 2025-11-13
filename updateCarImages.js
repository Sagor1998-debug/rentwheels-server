import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js"; // Adjust path if your Car model is elsewhere

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const updateAllCarImages = async () => {
  try {
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("✅ Connected to MongoDB");

    const updates = [
      { name: "Mercedes C-Class", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Mercedes-C-Class.jpeg" },
      { name: "Tesla Model 3", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Tesla-Model-3.jpeg" },
      { name: "Nissan Leaf", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Nissan-Leaf.jpeg" },
      { name: "Toyota RAV4", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Toyota-RAV4.jpeg" },
      { name: "Mitsubishi Outlander", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Mitsubishi-Outlander.jpeg" },
      { name: "Volkswagen Golf", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Volkswagen-Golf.jpeg" },
      { name: "Toyota Prius", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Toyota-Prius.jpeg" },
      { name: "Audi A4", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Audi-A4.jpeg" },
      { name: "Ford Fiesta", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Ford-Fiesta.jpeg" },
      { name: "Audi Q5", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Audi-Q5.jpeg" },
      { name: "Toyota Corolla", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Toyota-Corolla.jpeg" },
      { name: "Honda Civic", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Honda-Civic.jpeg" },
      { name: "BMW 3 Series", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/BMW-3-Series.jpeg" },
      { name: "Mazda CX-5", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Mazda-CX-5.jpeg" },
      { name: "Suzuki Swift", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Suzuki-Swift.jpeg" },
      { name: "BMW X5", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/BMW-X5.jpeg" },
      { name: "Nissan X-Trail", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Nissan-X-Trail.jpeg" },
      { name: "Hyundai Kona Electric", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Hyundai-Kona-Electric.jpeg" },
      { name: "Honda HR-V", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Honda-HR-V.jpeg" },
      { name: "Kia Sportage", imageUrl: "https://rentwheels-server-3.onrender.com/public/car/Kia-Sportage.jpeg" }
    ];

    for (const car of updates) {
      const result = await Car.findOneAndUpdate(
        { name: car.name },
        { imageUrl: car.imageUrl }
      );
      if (result) {
        console.log(`✅ Updated image for: ${car.name}`);
      } else {
        console.log(`⚠️ Car not found in DB: ${car.name}`);
      }
    }

    console.log("✅ All car images updated successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating car images:", error);
    process.exit(1);
  }
};

updateAllCarImages();
