const Booking = require("../models/Booking");
const Theater = require("../models/Theater");
const Movie = require("../models/Movie");

exports.bookSeats = async (req, res) => {
  const {
    movieId,
    theaterId,
    screenNumber,
    showtime,
    date,
    seats,
    paymentStatus,
  } = req.body;

  try {
    if (paymentStatus === "failed") {
      return res
        .status(400)
        .json({ message: "Payment failed, booking not completed" });
    }

    const theater = await Theater.findById(theaterId);
    const movie = await Movie.findById(movieId);
    if (!theater || !movie) {
      return res.status(400).json({ message: "Invalid theater or movie ID" });
    }

    const screen = theater.screens.find((s) => s.screenNumber === screenNumber);
    if (!screen) {
      return res.status(400).json({ message: "Invalid screen number" });
    }

    const bookingDate = date ? new Date(date) : new Date("2025-02-16");
    const nextDate = new Date(bookingDate);
    nextDate.setDate(bookingDate.getDate() + 1);

    const existingBookings = await Booking.find({
      theaterId,
      screenNumber,
      movieId,
      showtime,
      date: { $gte: bookingDate, $lt: nextDate },
      seats: { $in: seats },
    });

    if (existingBookings.length > 0) {
      return res
        .status(409)
        .json({ message: "Some seats are already booked for this showtime" });
    }

    const booking = new Booking({
      userId: req.user.id,
      movieId,
      theaterId,
      screenNumber,
      showtime,
      seats,
      date: bookingDate,
      paymentStatus: "successful",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "movieId theaterId"
    );
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    console.log("Booking found: ", booking);
    if (booking) {
      // Add logic later here to check if the show has started before allowing cancellation
      await booking.deleteOne();
      res.json({ message: "Booking cancelled" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to cancel booking", error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("movieId theaterId userId");
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
};
