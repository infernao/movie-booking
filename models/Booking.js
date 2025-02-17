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
  showtime: { type: String, required: true },
  seats: [{ type: String, required: true }],
  paymentStatus: {
    type: String,
    enum: ["successful", "failed"],
    default: "failed",
  },
  date: { type: String, required: true, default: "2025-02-16" }, // Default for existing records
});

module.exports = mongoose.model("Booking", BookingSchema);
