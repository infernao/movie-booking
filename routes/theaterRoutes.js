// routes/theaterRoutes.js
const express = require("express");
const { addTheater, getTheaters } = require("../controllers/theaterController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addTheater);
router.get("/", getTheaters);

module.exports = router;
