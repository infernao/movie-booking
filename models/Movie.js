// models/Movie.js
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, required: true },
  showtimes: [{ theaterId: mongoose.Schema.Types.ObjectId, time: Date }],
});

module.exports = mongoose.model("Movie", MovieSchema);
