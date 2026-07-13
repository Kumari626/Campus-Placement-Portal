const Job = require("../models/Job");
const Application = require("../models/Application");

// Create Job
const createJob = async (req, res) => {
  try {

    const job = await Job.create(req.body);

    res.status(201).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Jobs
const getJobs = async (req, res) => {
  try {

    const jobs = await Job.find().sort({
      createdAt: -1,
    });

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Job
const updateJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job Updated Successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Delete all applications related to this job
    await Application.deleteMany({
      job: req.params.id,
    });

    // Delete the job
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};