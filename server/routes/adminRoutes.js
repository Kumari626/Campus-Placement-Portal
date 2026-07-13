const express = require("express");

const router = express.Router();

const {
  getStatistics,
  getStudents
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");


// Dashboard Statistics
router.get(
  "/statistics",
  protect,
  getStatistics
);


// Get All Students
router.get(
  "/students",
  protect,
  getStudents
);

module.exports = router;