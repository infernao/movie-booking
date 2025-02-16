// models/Theater.js
const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  screens: [
    {
      screenNumber: { type: Number, required: true },
      totalSeats: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Theater", TheaterSchema);
