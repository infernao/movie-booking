const express = require("express");
const {
  addTheater,
  getTheaters,
  deleteTheater,
  deleteScreen,
  addScreen,
} = require("../controllers/theaterController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, addTheater);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTheater);
router.post("/:theaterId/screen", authMiddleware, adminMiddleware, addScreen);
router.delete(
  "/:theaterId/screen/:screenId",
  authMiddleware,
  adminMiddleware,
  deleteScreen
);
router.get("/", getTheaters);

module.exports = router;
