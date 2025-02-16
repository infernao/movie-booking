// routes/movieRoutes.js
const express = require("express");
const {
  addMovie,
  getMovies,
  getMovie,
} = require("../controllers/movieController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);

module.exports = router;
