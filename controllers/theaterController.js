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
