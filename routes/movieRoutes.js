const express = require("express");
const {
  addMovie,
  getMovies,
  getMovie,
  deleteMovie,
} = require("../controllers/movieController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, addMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);

module.exports = router;
