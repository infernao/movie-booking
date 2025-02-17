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
// In bookingRoutes.js
// bookingRoutes.js
router.get("/:theaterId/:screenNumber/:showtime", async (req, res) => {
  const { theaterId, screenNumber, showtime } = req.params;
  const { date } = req.query; // Get date from query
  try {
    const filter = { theaterId, screenNumber, showtime };
    if (date) {
      // Create a range for the selected day:
      const selectedDate = new Date(date);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      // Query for bookings where the date is within the selected day
      filter.date = { $gte: selectedDate, $lt: nextDate };
    }
    const bookings = await Booking.find(filter);
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
