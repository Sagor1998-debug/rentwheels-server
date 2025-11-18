// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Book a car
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
      status: "Confirmed",
    });

    await booking.save();

    // Update car status
    car.status = "unavailable";
    await car.save();

    res.status(201).json({ message: "Car booked successfully!", booking });
  } catch (error) {
    console.error("Book car error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

// Get my bookings

 
// getMyBookings — পুরোটা রিপ্লেস করো এই কোড দিয়ে
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 })
      .populate("carId");

    // এই ফর্ম্যাটিংটা করলে Car Name কখনোই খালি থাকবে না — ১০০% গ্যারান্টি
    const result = bookings.map((booking) => ({
      _id: booking._id,
      carId: booking.carId?._id || booking.carId,
      carName: booking.carName || (booking.carId?.name) || "Deleted Car",
      category: booking.category || (booking.carId?.category) || "N/A",
      rentPrice: booking.rentPrice || (booking.carId?.rentPrice) || 0,
      imageUrl: booking.imageUrl || (booking.carId?.imageUrl) || "https://via.placeholder.com/300x200.png?text=No+Image",
      providerName: booking.providerName || (booking.carId?.providerName) || "Unknown Provider",
      providerEmail: booking.providerEmail || (booking.carId?.providerEmail) || "",
      status: booking.status || "Confirmed",
      createdAt: booking.createdAt,
    }));

    res.json(result);
  } catch (error) {
    console.error("Get my bookings error:", error);
    res.status(500).json({ message: "Failed to load bookings" });
  }
};
// 
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userEmail !== req.user.email) {
      return res.status(403).json({ message: "You can only cancel your own booking" });
    }

    // Make car available again
    await Car.findByIdAndUpdate(booking.carId, { status: "available" });

    // Delete booking
    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};