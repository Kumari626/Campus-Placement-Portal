const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

// Student Apply Job
router.post("/", protect, applyJob);

// Student My Applications
router.get("/my", protect, getMyApplications);

// Admin View All Applications
router.get("/all", protect, getAllApplications);

// Admin Update Application Status
router.put("/:id", protect, updateApplicationStatus);

module.exports = router;