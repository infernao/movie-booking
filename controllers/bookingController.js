// controllers/bookingController.js
const Booking = require("../models/Booking");
const Theater = require("../models/Theater"); // Import Theater model
const Movie = require("../models/Movie"); // Import Movie model

// Updated bookSeats function
exports.bookSeats = async (req, res) => {
  const { movieId, theaterId, screenNumber, seats } = req.body;

  try {
    // 1. Verify Theater and Movie exist
    const theater = await Theater.findById(theaterId);
    const movie = await Movie.findById(movieId);
    if (!theater || !movie) {
      return res.status(400).json({ message: "Invalid theater or movie ID" });
    }

    // 2.  Check if the screen exists in the theater
    const screen = theater.screens.find((s) => s.screenNumber === screenNumber);
    if (!screen) {
      return res.status(400).json({ message: "Invalid screen number" });
    }

    // 3. Check Seat Availability (Very Simplified)
    //    This is a placeholder.  A real system needs a robust check against existing bookings.
    //    Assume seats are strings like "A1", "A2", etc.
    //    This check only prevents duplicate bookings in rapid succession.
    const existingBookings = await Booking.find({
      theaterId,
      screenNumber,
      movieId,
      seats: { $in: seats },
    });

    if (existingBookings.length > 0) {
      return res.status(409).json({ message: "Some seats are already booked" });
    }

    // 4. Simulate Payment (Dummy Payment)
    const paymentSuccessful = Math.random() > 0.2; // 80% success rate

    if (paymentSuccessful) {
      // 5. Create Booking
      const booking = new Booking({
        userId: req.user.id,
        movieId,
        theaterId,
        screenNumber,
        seats,
        paymentStatus: "successful",
      });

      await booking.save();
      res.status(201).json(booking);
    } else {
      // Payment Failed
      res.status(402).json({ message: "Payment failed. Seats not booked." }); // Corrected status code
    }
  } catch (error) {
    console.error(error); // Log the error
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
    if (booking) {
      // Add logic here to check if the show has started before allowing cancellation
      await booking.deleteOne(); // Changed booking.remove() to booking.deleteOne()
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
