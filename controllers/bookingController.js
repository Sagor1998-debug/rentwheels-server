// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// ✅ Book a car
export const bookCar = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userEmail = req.user.email; // From Firebase decoded token
    const userName = req.user.name || req.user.name || "Unknown User";

    // Check if the car exists
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Check if the car is already booked
    if (car.status === "unavailable") {
      return res.status(400).json({ message: "Car already booked" });
    }

    // Save booking data
    const newBooking = new Booking({
      carId,
      userEmail,
      userName,
      startDate,
      endDate,
      carName: car.name,
      rentPrice: car.rentPrice,
      providerEmail: car.ownerEmail || "N/A",
      status: "Confirmed",
    });

    await newBooking.save();

    // ✅ Update car status
    car.status = "unavailable";
    await car.save();

    return res.status(201).json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Server error while booking" });
  }
};

// ✅ Fetch user bookings
export const getMyBookings = async (req, res) => {
  try {
    const email = req.user.email;
    const bookings = await Booking.find({ userEmail: email });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // ✅ Make car available again
    const car = await Car.findById(booking.carId);
    if (car) {
      car.status = "available";
      await car.save();
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled and car is now available" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};
