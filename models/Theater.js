// models/Theater.js
const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  screens: [
    {
      screenNumber: { type: Number, required: true },
      totalSeats: { type: Number, required: true },
      seatLayout: { type: String, default: "Standard" },
      showtimes: [{ type: String, required: true }],
      seatPrices: {
        Standard: { type: Number, required: true },
        Premium: { type: Number, required: true },
      }, // Admin-defined seat prices
    },
  ],
});

module.exports = mongoose.model("Theater", TheaterSchema);
