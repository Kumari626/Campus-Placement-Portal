const express = require("express");
const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  uploadResume,
  forgotPassword,
} = require("../controllers/authController");

// Multer Configuration
const upload = multer({
  dest: "uploads/",
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.put("/forgot-password", forgotPassword);

// Get Profile
router.get("/profile", protect, getProfile);

// Upload Resume
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;