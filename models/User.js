const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Added unique
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" }, // Added role
});

module.exports = mongoose.model("User", UserSchema);
