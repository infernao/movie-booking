// routes/theaterRoutes.js
const express = require("express");
const { addTheater, getTheaters } = require("../controllers/theaterController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware"); //Imported adminMiddleware
const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, addTheater); //Admin only
router.get("/", getTheaters);

module.exports = router;
