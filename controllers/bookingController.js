// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

export const bookCar = async (req, res) => {
  try {
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.status === "Booked") return res.status(400).json({ message: "Car already booked" });

    const booking = new Booking({
      car: car._id,
      user: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
    });

    await booking.save();

    car.status = "Booked";
    await car.save();

    res.status(201).json({ message: "✅ Car booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "❌ Booking failed", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "❌ Fetching bookings failed", error: error.message });
  }
};

// Optional: Cancel a booking (mark booking cancelled & set car to Available)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (String(booking.user) !== String(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    booking.status = "Cancelled";
    await booking.save();

    const car = await Car.findById(booking.car);
    if (car) {
      car.status = "Available";
      await car.save();
    }

    res.json({ message: "✅ Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "❌ Cancel failed", error: error.message });
  }
};
