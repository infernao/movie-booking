// controllers/movieController.js
const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
};

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};
