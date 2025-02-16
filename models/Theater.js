// models/Theater.js
const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String }, // Added location
  screens: [
    {
      screenNumber: { type: Number, required: true },
      totalSeats: { type: Number, required: true },
      seatLayout: { type: String, default: "Standard" }, // Added seat layout
    },
  ],
});

module.exports = mongoose.model("Theater", TheaterSchema);
