const Application = require("../models/Application");


// Apply for a Job
const applyJob = async (req, res) => {
  try {

    console.log("User:", req.user);
    console.log("Body:", req.body);


    const { jobId } = req.body;


    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }


    const alreadyApplied = await Application.findOne({
      student: req.user.id,
      job: jobId,
    });


    if (alreadyApplied) {

      return res.status(400).json({
        message: "You have already applied for this job",
      });

    }


    const application = await Application.create({

      student: req.user.id,
      job: jobId,
      status: "Pending",

    });


    res.status(201).json({

      message: "Applied Successfully",
      application,

    });



  } catch(error) {


    res.status(500).json({

      message:error.message,

    });


  }

};




// Get My Applications

const getMyApplications = async (req,res)=>{

  try {


    console.log("USER ID:", req.user.id);



    const allApplications = await Application.find();


    console.log(
      "ALL APPLICATIONS COUNT:",
      allApplications.length
    );



    const applications = await Application.find({

      student:req.user.id,

    })
    .populate("job");



    console.log(
      "MATCHED APPLICATIONS:",
      applications
    );



    res.status(200).json(applications);



  } catch(error) {


    console.log(error);


    res.status(500).json({

      message:error.message,

    });


  }

};







// Get All Applications (Admin)

const getAllApplications = async(req,res)=>{

  try {


    const applications = await Application.find()

    .populate("student","name email")

    .populate("job","title company");



    res.status(200).json(applications);



  } catch(error) {


    res.status(500).json({

      message:error.message,

    });


  }

};







// Update Application Status

const updateApplicationStatus = async(req,res)=>{

  try {


    const {status}=req.body;



    const application =
    await Application.findByIdAndUpdate(

      req.params.id,

      {
        status,
      },

      {
        new:true,
      }

    );



    if(!application){

      return res.status(404).json({

        message:"Application not found",

      });

    }



    res.status(200).json({

      message:"Application Status Updated",

      application,

    });



  } catch(error) {


    res.status(500).json({

      message:error.message,

    });


  }

};






module.exports = {

  applyJob,

  getMyApplications,

  getAllApplications,

  updateApplicationStatus,

};