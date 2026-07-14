import { useEffect, useState } from "react";
import api from "../services/api";

function ManageBoard() {

  const [jobs, setJobs] = useState<any[]>([]);
  const [editJob, setEditJob] = useState<any>(null);


  useEffect(() => {
    getJobs();
  }, []);


  const getJobs = async () => {
    try {
      const response = await api.get("/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteJob = async (id: string) => {
    try {

      await api.delete(`/api/jobs/${id}`);

      setJobs(
        jobs.filter((job) => job._id !== id)
      );

      alert("Job Deleted Successfully");

    } catch (error) {
      console.log(error);
    }
  };


  const updateJob = async () => {

    try {

      await api.put(
        `/api/jobs/${editJob._id}`,
        editJob
      );

      alert("Job Updated Successfully");

      setEditJob(null);

      getJobs();

    } catch (error) {
      console.log(error);
    }

  };


  return (

    <div className="container py-5">


      <h1 className="text-center mb-5 text-primary">
        Manage Board
      </h1>



      {editJob && (

        <div className="card shadow p-4 mb-5">


          <h3 className="text-center mb-4">
            Edit Job
          </h3>


          <div className="row">


            <div className="col-md-6 mb-3">

              <input
                className="form-control"
                value={editJob.title}
                onChange={(e)=>
                  setEditJob({
                    ...editJob,
                    title:e.target.value
                  })
                }
              />

            </div>



            <div className="col-md-6 mb-3">

              <input
                className="form-control"
                value={editJob.company}
                onChange={(e)=>
                  setEditJob({
                    ...editJob,
                    company:e.target.value
                  })
                }
              />

            </div>



            <div className="col-md-6 mb-3">

              <input
                className="form-control"
                value={editJob.location}
                onChange={(e)=>
                  setEditJob({
                    ...editJob,
                    location:e.target.value
                  })
                }
              />

            </div>



            <div className="col-md-6 mb-3">

              <input
                className="form-control"
                value={editJob.package}
                onChange={(e)=>
                  setEditJob({
                    ...editJob,
                    package:e.target.value
                  })
                }
              />

            </div>


          </div>



          <button
            className="btn btn-success mx-auto d-block px-5"
            onClick={updateJob}
          >
            Update
          </button>


        </div>

      )}




      <div className="card shadow-lg border-0">


        <div className="card-body">


          <div className="table-responsive">


            <table className="table table-hover text-center align-middle">


              <thead className="table-dark">

                <tr>

                  <th>Title</th>

                  <th>Company</th>

                  <th>Location</th>

                  <th>Package</th>

                  <th>Action</th>

                </tr>

              </thead>



              <tbody>


              {jobs.map((job)=>(


                <tr key={job._id}>


                  <td>{job.title}</td>


                  <td>{job.company}</td>


                  <td>{job.location}</td>


                  <td>{job.package}</td>



                  <td>


                    <button

                      className="btn btn-warning btn-sm me-2"

                      onClick={()=>
                        setEditJob(job)
                      }

                    >

                      ✏️ Edit

                    </button>



                    <button

                      className="btn btn-danger btn-sm"

                      onClick={()=>
                        deleteJob(job._id)
                      }

                    >

                      🗑 Delete

                    </button>


                  </td>


                </tr>


              ))}


              </tbody>


            </table>


          </div>


        </div>


      </div>


    </div>

  );

}

export default ManageBoard;