// routes/bookingRoutes.js
const express = require("express");
const {
  bookSeats,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, bookSeats);
router.get("/", authMiddleware, getUserBookings);
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;
