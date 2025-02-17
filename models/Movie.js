// models/Movie.js
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  showtimes: [
    {
      type: String,
      enum: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
    },
  ],
  /*showtimes: [
    {
      theaterId: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
      screenNumber: { type: Number, required: true }, // Added screenNumber
      time: { type: Date, required: true },
      price: { type: Number, default: 10 }, //Added price
    },
  ],*/
});

module.exports = mongoose.model("Movie", MovieSchema);
