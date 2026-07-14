import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CreateJob() {

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    package: ""
  });


  const handleChange = (e: any) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/jobs",
        job,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Job Created Successfully");

      setJob({
        title: "",
        company: "",
        description: "",
        location: "",
        package: ""
      });

    } catch(error) {

      console.log(error);
      alert("Job Creation Failed");

    }

  };


  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Create New Job
          </h2>


          <div className="mb-3">
            <label className="form-label">
              Job Title
            </label>

            <input
              className="form-control"
              name="title"
              placeholder="Enter Job Title"
              value={job.title}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Company Name
            </label>

            <input
              className="form-control"
              name="company"
              placeholder="Enter Company Name"
              value={job.company}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              name="description"
              placeholder="Enter Job Description"
              value={job.description}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Location
            </label>

            <input
              className="form-control"
              name="location"
              placeholder="Enter Location"
              value={job.location}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Package
            </label>

            <input
              className="form-control"
              name="package"
              placeholder="Enter Package"
              value={job.package}
              onChange={handleChange}
            />
          </div>


          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Create Job
          </button>


        </div>

      </div>
    </>
  );
}

export default CreateJob;