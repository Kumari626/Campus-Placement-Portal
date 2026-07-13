const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create Job
router.post("/", createJob);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;