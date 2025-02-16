// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  screenNumber: { type: Number, required: true },
  seats: [{ type: String, required: true }],
  paymentStatus: {
    type: String,
    enum: ["successful", "failed"],
    required: true,
  },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
