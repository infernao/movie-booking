// controllers/theaterController.js
const Theater = require("../models/Theater");

exports.addTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json(theater);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add theater", error: error.message });
  }
};

exports.getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve theaters", error: error.message });
  }
};

exports.deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.json(theater);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete theater", error: error.message });
  }
};

exports.addScreen = async (req, res) => {
  const { screenNumber, totalSeats, seatLayout, showtimes } = req.body;
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    const newScreen = { screenNumber, totalSeats, seatLayout, showtimes };
    theater.screens.push(newScreen);
    await theater.save();
    res.json(theater);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add screen", error: error.message });
  }
};

exports.deleteScreen = async (req, res) => {
  const { theaterId, screenId } = req.params;
  try {
    const theater = await Theater.findById(req.params.theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    theater.screens = theater.screens.filter(
      (screen) => screen._id.toString() !== screenId
    );
    await theater.save();
    res.json({ message: "Screen deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete screen", error: error.message });
  }
};
