// controllers/bookingController.js
const Booking = require("../models/Booking");

exports.bookSeats = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.status(201).json(booking);
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate(
    "movieId theaterId"
  );
  res.json(bookings);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await booking.remove();
    res.json({ message: "Booking cancelled" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
};
