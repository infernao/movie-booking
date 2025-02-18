const API_BASE_URL = "http://localhost:5000/api";
let authToken = null;
let userRole = null;

async function fetchData(
  url,
  method = "GET",
  body = null,
  requiresAuth = false
) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (requiresAuth && authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

function showMessage(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.style.color = isError ? "red" : "green";
}

function clearMessage(elementId) {
  document.getElementById(elementId).textContent = "";
}

function updateUI(loggedIn) {
  document.getElementById("login-btn").style.display = loggedIn
    ? "none"
    : "inline-block";
  document.getElementById("register-btn").style.display = loggedIn
    ? "none"
    : "inline-block";
  document.getElementById("logout-btn").style.display = loggedIn
    ? "inline-block"
    : "none";
  document.getElementById("user-info").style.display = loggedIn
    ? "inline"
    : "none";
  document.getElementById("auth-forms").style.display = "none";
  document.getElementById("booking-form").style.display = loggedIn
    ? "block"
    : "none";
  document.getElementById("my-bookings").style.display = loggedIn
    ? "block"
    : "none";

  if (loggedIn) {
    document.getElementById(
      "user-info"
    ).textContent = `Logged in as ${localStorage.getItem(
      "username"
    )} (${userRole})`;
  } else {
    document.getElementById("user-info").textContent = "";
  }
}

async function registerUser(username, password) {
  try {
    const data = await fetchData(`${API_BASE_URL}/auth/register`, "POST", {
      username,
      password,
    });
    showMessage("register-message", "Registration successful. Please log in.");
  } catch (error) {
    showMessage(
      "register-message",
      "Registration failed: " + error.message,
      true
    );
  }
}

async function loginUser(username, password) {
  try {
    const data = await fetchData(`${API_BASE_URL}/auth/login`, "POST", {
      username,
      password,
    });
    authToken = data.token;
    userRole = data.role;

    localStorage.setItem("authToken", authToken);
    localStorage.setItem("username", username);
    localStorage.setItem("userRole", userRole);

    updateUI(true);
    showMessage("login-message", "Login successful.");
    loadMovies();
    loadTheaters();
  } catch (error) {
    showMessage("login-message", "Login failed: " + error.message, true);
  }
}

function logoutUser() {
  authToken = null;
  userRole = null;
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
  updateUI(false);
}

async function loadMovies() {
  try {
    const movies = await fetchData(`${API_BASE_URL}/movies`);
    const movieList = document.getElementById("movies");
    movieList.innerHTML = "";
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = `${movie.title} (${movie.genre})`;
      movieList.appendChild(li);

      const option = document.createElement("option");
      option.value = movie._id;
      option.textContent = movie.title;
      document.getElementById("movie-select").appendChild(option);
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

async function loadTheaters() {
  try {
    const theaters = await fetchData(`${API_BASE_URL}/theaters`);
    const theaterList = document.getElementById("theaters");
    theaterList.innerHTML = "";
    theaters.forEach((theater) => {
      const li = document.createElement("li");
      li.textContent = `${theater.name} - ${theater.location}`;
      theaterList.appendChild(li);

      const option = document.createElement("option");
      option.value = theater._id;
      option.textContent = theater.name;
      document.getElementById("theater-select").appendChild(option);
    });
  } catch (error) {
    console.error("Error loading theaters:", error);
  }
}

async function bookSeats(movieId, theaterId, screenNumber, seats) {
  try {
    const bookingData = {
      movieId,
      theaterId,
      screenNumber: parseInt(screenNumber),
      seats: seats.split(",").map((s) => s.trim()),
    };
    const booking = await fetchData(
      `${API_BASE_URL}/bookings`,
      "POST",
      bookingData,
      true
    );
    showMessage("booking-message", "Booking successful!");
    loadUserBookings();
  } catch (error) {
    showMessage("booking-message", "Booking failed: " + error.message, true);
  }
}

async function loadUserBookings() {
  try {
    const bookings = await fetchData(
      `${API_BASE_URL}/bookings`,
      "GET",
      null,
      true
    );
    const bookingsList = document.getElementById("bookings-list");
    bookingsList.innerHTML = "";
    bookings.forEach((booking) => {
      const li = document.createElement("li");
      li.textContent = `Movie: ${booking.movieId.title}, Theater: ${
        booking.theaterId.name
      }, Seats: ${booking.seats.join(", ")}`;
      bookingsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading bookings:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("register-btn").addEventListener("click", () => {
    document.getElementById("auth-forms").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    clearMessage("login-message");
    clearMessage("register-message");
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    document.getElementById("auth-forms").style.display = "block";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
    clearMessage("login-message");
    clearMessage("register-message");
  });

  document
    .getElementById("register-submit")
    .addEventListener("click", async () => {
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;
      await registerUser(username, password);
    });

  document
    .getElementById("login-submit")
    .addEventListener("click", async () => {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      await loginUser(username, password);
    });

  document.getElementById("logout-btn").addEventListener("click", logoutUser);

  document
    .getElementById("book-seats-btn")
    .addEventListener("click", async () => {
      const movieId = document.getElementById("movie-select").value;
      const theaterId = document.getElementById("theater-select").value;
      const screenNumber = document.getElementById("screen-number").value;
      const seats = document.getElementById("seats").value;
      await bookSeats(movieId, theaterId, screenNumber, seats);
    });

  const storedToken = localStorage.getItem("authToken");
  const storedUsername = localStorage.getItem("username");
  const storedRole = localStorage.getItem("userRole");

  if (storedToken) {
    authToken = storedToken;
    userRole = storedRole;
    updateUI(true);
    loadMovies();
    loadTheaters();
    loadUserBookings();
  } else {
    updateUI(false);
  }
});
