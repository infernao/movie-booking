const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Movie = require("./models/Movie");
const Theater = require("./models/Theater");
const Booking = require("./models/Booking");

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected...");

    //await User.deleteMany();
    //await Movie.deleteMany();
    //await Theater.deleteMany();
    //await Booking.deleteMany();

    //console.log("Old data cleared...");

    // Create 10 theaters
    const theaters = await Theater.insertMany(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Theater ${i + 1}`,
        location: `Location ${i + 1}`,
        screens: [
          { screenNumber: 1, totalSeats: 100, seatLayout: "Standard" },
          { screenNumber: 2, totalSeats: 150, seatLayout: "Premium" },
        ],
      }))
    );

    console.log("10 Theaters seeded...");

    // Function to generate random showtimes within the next 7 days
    const generateShowtimes = (movieIndex) => {
      const showtimes = [];
      for (let i = 0; i < 3; i++) {
        // Each movie will have 3 showtimes in different theaters
        const theater = theaters[(movieIndex + i) % theaters.length];
        const randomDays = Math.floor(Math.random() * 7); // Random day within next 7 days
        const randomHours = Math.floor(Math.random() * 12) + 10; // Between 10 AM - 10 PM
        const date = new Date();
        date.setDate(date.getDate() + randomDays);
        date.setHours(randomHours, 0, 0);

        showtimes.push({
          theaterId: theater._id,
          screenNumber: (i % 2) + 1, // Alternate between screens
          time: date.toISOString(),
          price: i % 2 === 0 ? 15 : 30, // $15 for Standard, $30 for Premium
        });
      }
      return showtimes;
    };

    // Create 15 movies with multiple showtimes
    const movies = await Movie.insertMany(
      Array.from({ length: 15 }, (_, i) => ({
        title: `Movie ${i + 1}`,
        genre: i % 2 === 0 ? "Action" : "Drama",
        duration: 120 + (i % 5) * 10, // Vary duration
        language: "English",
        showtimes: generateShowtimes(i),
      }))
    );

    console.log("15 Movies seeded...");

    mongoose.connection.close();
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
