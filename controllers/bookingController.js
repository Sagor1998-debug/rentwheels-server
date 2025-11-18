// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

export const bookCar = async (req, res) => {
  try {
    const { carId } = req.body;
    const userEmail = req.user.email;
    const userName = req.user.name || "User";

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.status === "unavailable") {
      return res.status(400).json({ message: "This car is already booked" });
    }

    const booking = new Booking({
      carId,
      userEmail,
      userName,
      carName: car.name,
      category: car.category,
      rentPrice: car.rentPrice,
      imageUrl: car.imageUrl,
      providerName: car.providerName,
      providerEmail: car.providerEmail,
    });

    await booking.save();

    car.status = "unavailable";
    await car.save();

    res.status(201).json({ message: "Booked successfully!", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 })
      .populate("carId", "name imageUrl category rentPrice status providerName");

    res.json(bookings);
  } catch (error) {
    console.error("getMyBookings error:", error);
    res.status(500).json({ message: "Failed to load your bookings" });
  }
};