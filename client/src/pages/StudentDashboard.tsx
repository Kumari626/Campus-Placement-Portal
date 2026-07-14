import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function StudentDashboard() {

  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    setLoading(true);

    try {

      await Promise.all([
        getJobs(),
        getAppliedJobs()
      ]);

    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // Get Jobs

  const getJobs = async () => {

    try {

      const res = await api.get("/api/jobs");

      setJobs(res.data);

    } catch(error) {

      console.log(error);

      toast.error("Failed to load jobs");

    }

  };


  // Get Applied Jobs
  // Get Applied Jobs

const getAppliedJobs = async () => {

  try {

    const token = localStorage.getItem("token");


    if (!token) {

      console.log("Token not found");

      return;

    }



    const response = await api.get(

      "/api/applications/my",

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );



    console.log(
      "MY APPLICATIONS:",
      response.data
    );



    const ids = response.data

      .filter((app:any) => app.job !== null)

      .map((app:any) => app.job._id);



    console.log(
      "APPLIED IDS:",
      ids
    );



    setAppliedJobs(ids);



  } catch(error:any) {


    console.log(

      "APPLICATION ERROR:",

      error.response?.data || error.message

    );


  }

};
  // Apply Job

  const applyJob = async (jobId:string) => {

    try {

      const token = localStorage.getItem("token");


      await api.post(
        "/api/applications",
        {
          jobId,
        },
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      toast.success("Applied Successfully");


      // Refresh data
      await loadDashboard();


    } catch(error:any) {


      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );


    }

  };



  // Search

  const filteredJobs = jobs.filter((job:any)=>{

    const value = search.toLowerCase();


    return (

      job.title?.toLowerCase().includes(value) ||

      job.company?.toLowerCase().includes(value) ||

      job.location?.toLowerCase().includes(value)

    );

  });



  // Statistics

  const totalJobs = jobs.length;

  const appliedCount = appliedJobs.length;

  const availableJobs = totalJobs - appliedCount;



  return (

    <>

      <Navbar />


      <div className="container py-4">


        <h2 className="text-center mb-4">
          Student Dashboard
        </h2>


        {/* Statistics */}

        <div className="row mb-4">


          <div className="col-md-4 mb-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>Total Jobs</h5>

                <h2>{totalJobs}</h2>

              </div>

            </div>

          </div>



          <div className="col-md-4 mb-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>Applied Jobs</h5>

                <h2>{appliedCount}</h2>

              </div>

            </div>

          </div>



          <div className="col-md-4 mb-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>Available Jobs</h5>

                <h2>{availableJobs}</h2>

              </div>

            </div>

          </div>


        </div>



        {/* Search */}

        <div className="mb-4">

          <input

            type="text"

            className="form-control"

            placeholder="Search by title, company or location"

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

        </div>
        {/* Jobs */}

        {
          loading ? (

            <div className="text-center mt-5">

              <div className="spinner-border text-primary"></div>

              <p className="mt-3">
                Loading Jobs...
              </p>

            </div>


          ) : (

            <div className="row">


              {
                filteredJobs.length === 0 ? (

                  <h5 className="text-center text-muted">
                    No Jobs Found
                  </h5>


                ) : (

                  filteredJobs.map((job:any)=>(


                    <div
                      className="col-md-6 col-lg-4 mb-4"
                      key={job._id}
                    >


                      <div className="card shadow h-100 job-card">


                        <div className="card-body d-flex flex-column">


                          <h4 className="job-title">
                            {job.title}
                          </h4>


                          <h6 className="company-name">
                            {job.company}
                          </h6>


                          <p className="job-description">
                            {job.description}
                          </p>


                          <p className="job-info">
                            <b>Location:</b> {job.location}
                          </p>


                          <p className="job-info">
                            <b>Package:</b> {job.package}
                          </p>



                          <div className="d-grid  mt-auto">
                          


                            {
                              appliedJobs.includes(job._id) ? (


                                <button
                                  className="btn applied-btn"
                                  disabled
                                >

                                  Applied

                                </button>


                              ) : (


                                <button
                                  className="btn btn-primary"
                                  onClick={() => applyJob(job._id)}
                                >

                                  Apply Now

                                </button>


                              )

                            }


                          </div>



                        </div>


                      </div>


                    </div>


                  ))

                )

              }


            </div>

          )

        }


      </div>


    </>

  );

}


export default StudentDashboard;