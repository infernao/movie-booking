const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  bookSeats,
  getUserBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");

// Get booked seats for a specific theater, screen, and showtime
router.get("/:theaterId/:screenNumber/:showtime", async (req, res) => {
  const { theaterId, screenNumber, showtime } = req.params;
  try {
    const bookings = await Booking.find({ theaterId, screenNumber, showtime });
    const bookedSeats = bookings.flatMap((b) => b.seats);
    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve booked seats",
      error: error.message,
    });
  }
});
console.log(bookSeats);
router.post("/", authMiddleware, bookSeats);
router.get("/user", authMiddleware, getUserBookings);
router.delete("/:id", authMiddleware, cancelBooking);
router.get("/all", authMiddleware, getAllBookings);

module.exports = router;
