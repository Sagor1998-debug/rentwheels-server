import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// ✅ Book a car
export const bookCar = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const car = await Car.findById(carId);

    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.status === "Unavailable")
      return res.status(400).json({ message: "Car already booked" });

    const booking = new Booking({
      car: carId,
      user: req.user._id,
      startDate,
      endDate,
    });

    await booking.save();

    car.status = "Unavailable";
    await car.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ My bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    const car = await Car.findById(booking.car);
    if (car) {
      car.status = "Available";
      await car.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
