# Infernao Movie Ticket Booking System

A Movie Ticket Booking System that allows users to search for movies, select a theater, book seats, and make payments. The system supports multiple theaters, screens, and seat categories. This project is built using **Node.js, Express.js, MongoDB**, and **React** for the frontend with basic ui and stylying

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [Model Relationships](#model-relationships)
- [Images of website pages](#pages)


---

## Project Overview

Infernao Movie Ticket Booking System is a web application designed for booking movie tickets in multiple theaters. It allows users to:

- Search for movies based on **title, location, or time**.
- Select a theater and showtime.
- Choose and book available seats.
- Make payments (**dummy payments** for the scope of the project).
- View **past and upcoming bookings**.
- Cancel bookings before the show starts.

**Admin users** (theater owners) have additional privileges, including:
- Adding movies.
- Managing theaters and screens.
- Setting ticket prices.

---

## Technologies Used

### **Frontend**
- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for sending HTTP requests to the backend.

### **Backend**
- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express.js**: A fast, unopinionated web framework for Node.js, used to build the backend RESTful API.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

### **Database**
- **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format.

### **Authentication**
- **JWT (JSON Web Tokens)**: Used for secure user authentication.

---

## Features

### **User Features**
✅ **Search for Movies**: Users can search for movies based on title, location, or showtime.  
✅ **Select a Theater & Showtime**: Users can view available theaters and select showtimes for movies.  
✅ **Seat Selection & Booking**: Customers can choose seats from available ones and complete bookings.  
✅ **Booking Confirmation & Cancellation**: Users get a **confirmation ticket** after booking and can cancel before the show starts (if applicable).  
✅ **View Past & Upcoming Bookings**: Users can track their **booking history** with showtimes and seat numbers.  

### **Admin Features**
✅ **Manage Movies**: Admins can **add, update, and delete** movies.  
✅ **Manage Theaters & Screens**: Admins can manage **theaters, screens, and assign showtimes**.  
✅ **Set Ticket Prices**: Admins can configure ticket pricing for different screen types (**standard, premium**).  
✅ **Manage Bookings**: Admins can view and manage user bookings.

### **Payment System**
✅ **Dummy Payment System**: Users must complete a **dummy payment** before confirming a booking.  
✅ **Payment Status Handling**: If payment fails, seats are released back to availability.

---

## Installation & Setup

### **Prerequisites**
Before running the project, ensure that you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (locally or using a cloud service like MongoDB Atlas)
- **npm** (Node Package Manager)


## Steps to Install

### 1️⃣ Clone the repository to your local machine:
git clone https://github.com/your-username/infernao-movie-booking.git

### 2️⃣ Navigate to the project folder:
cd infernao-movie-booking

### 3️⃣ Install the required dependencies for the backend:
npm install

### 4️⃣ Set up your MongoDB database connection:
- Create a .env file in the root directory.


## Running the Application

The frontend application will run on **[http://localhost:3000](http://localhost:3000)** by default.  
The backend API will run on **[http://localhost:5000](http://localhost:5000)**.  

You can interact with the system using the React frontend to make bookings, view movies, etc.  
**Admin functionality** can be accessed through user authentication (**admin login**).

---

## Database Schema

The system uses **MongoDB** with the following key models:

- **User**: Represents users of the system, including both customers and admins.
- **Movie**: Represents movies, which can be shown at multiple theaters.
- **Theater**: Represents theaters, each with multiple screens.
- **Screen**: Represents individual screens within a theater, each having a **seating capacity** and **showtimes** for movies.
- **Booking**: Represents user bookings, including **selected seats, payment status, and associated movie/showtime**.

---

## Model Relationships

📌 **User has many Bookings** (**One-to-Many**).  
📌 **Movie has many Theaters** (**Many-to-Many through showtimes**).  
📌 **Theater has many Screens** (**One-to-Many**).  
📌 **Screen is associated with one Movie and one Theater** (**Many-to-One**).  
📌 **Booking references User, Movie, Theater, and Screen** (**Many-to-One for each**).  
   
## Login Page Preview 
![LoginPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870667/Screenshot_2025-02-18_143210_xgjagd.png)   

## Register Page Preview
![RegisterPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870667/Screenshot_2025-02-18_143228_dhinta.png)   

## Movie Page Preview
![MoviePage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870668/Screenshot_2025-02-18_143628_ksuvez.png)

## Theatre Page Preview
![TheatrePage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870668/Screenshot_2025-02-18_143803_gg04kx.png)

## Booking Page Preview
![BookingPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870668/Screenshot_2025-02-18_143741_sotqha.png)

## Manage Theatre Page for Admin Preview 
![AdminPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870667/Screenshot_2025-02-18_144223_oowfie.png)

## Manage Bookings Page for Admin Preview
![ManageBookingsPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870669/Screenshot_2025-02-18_144154_szcbkx.png)

## Add Theatre Page for Admin Preview
![ManageBookingsPage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870669/Screenshot_2025-02-18_144127_frdwzp.png)

## Home Page Preview
![HomePage Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870667/Screenshot_2025-02-18_143537_mtmr8a.png)

## Movie Booking Page Preview
![MovieBookingPagePreview](https://res.cloudinary.com/dspmthece/image/upload/v1739870667/Screenshot_2025-02-18_143653_lq9od7.png)

## Admin Dashboard Preview 
![AdminDashboard Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739870668/Screenshot_2025-02-18_144035_r51hwo.png)

## Dummy Payment Page 
![PaymentSimulation Screenshot](https://res.cloudinary.com/dspmthece/image/upload/v1739877096/Screenshot_2025-02-18_164018_e8cjcs.png)


