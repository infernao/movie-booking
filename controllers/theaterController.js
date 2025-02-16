// controllers/theaterController.js
const Theater = require("../models/Theater");

exports.addTheater = async (req, res) => {
  const theater = new Theater(req.body);
  await theater.save();
  res.status(201).json(theater);
};

exports.getTheaters = async (req, res) => {
  const theaters = await Theater.find();
  res.json(theaters);
};
