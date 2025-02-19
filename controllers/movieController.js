const Movie = require("../models/Movie");

exports.getAvailableMovies = async (req, res) => {
  try {
    const count = await Movie.countDocuments({
      showtimes: { $type: "string" },
    });

    const randomLimit = Math.floor(Math.random() * count) || 1;

    // Fetch random movies where showtimes is a string type
    const randomMovies = await Movie.aggregate([
      { $match: { showtimes: { $type: "string" } } },
      { $sample: { size: randomLimit } },
    ]);

    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve random movies",
      error: error.message,
    });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add movie", error: error.message });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve movies", error: error.message });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve movie", error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete movie", error: error.message });
  }
};
