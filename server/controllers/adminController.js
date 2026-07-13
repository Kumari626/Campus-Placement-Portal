const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");


// Dashboard Statistics
const getStatistics = async (req, res) => {

  try {

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const selectedStudents = await Application.countDocuments({
      status: "Selected"
    });

    res.json({
      totalJobs,
      totalApplications,
      selectedStudents
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get All Students
const getStudents = async (req, res) => {

  try {

    const students = await User.find(
      { role: "student" },
      "-password"
    );

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  getStatistics,
  getStudents
};