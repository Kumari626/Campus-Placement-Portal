import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";


function MyApplications() {


  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const getApplications = async () => {


      try {


        const token = localStorage.getItem("token");


        const response = await api.get(

          "/applications/my",

          {

            headers: {

              Authorization: `Bearer ${token}`,

            },

          }

        );


        setApplications(response.data);



      } catch(error) {


        console.log(error);

        toast.error("Failed to load applications");



      } finally {


        setLoading(false);


      }



    };


    getApplications();



  }, []);






  const getStatusClass = (status:string) => {


    if(status === "Selected") {

      return "badge bg-success";

    }


    if(status === "Rejected") {

      return "badge bg-danger";

    }


    return "badge bg-warning text-dark";


  };






  return (

    <>


    <Navbar />



    <div className="container mt-5">



      <h1 className="text-center mb-4">

        📄 My Applications

      </h1>





      <div className="row">



      {loading ? (



        <div className="text-center">


          <div className="spinner-border text-primary">

          </div>


          <h5 className="mt-3">
            Loading Applications...
          </h5>


        </div>




      ) : applications.length === 0 ? (




        <h4 className="text-center text-muted">

          No Applications Found

        </h4>





      ) : (



        applications.map((app)=>(



          <div

            className="col-md-6 mb-4"

            key={app._id}

          >




            <div className="card shadow-lg border-0 h-100">



              <div className="card-body">





                <h3 className="text-primary">

                  {app.job?.title}

                </h3>





                <p>

                  🏢 <b>Company:</b> {app.job?.company}

                </p>





                <p>

                  📍 <b>Location:</b> {app.job?.location}

                </p>





                <p>

                  📅 <b>Applied Date:</b>{" "}

                  {
                    new Date(
                      app.createdAt
                    ).toLocaleDateString()
                  }

                </p>





                <p>

                  Status:

                  {" "}

                  <span

                    className={
                      getStatusClass(app.status)
                    }

                  >

                    {app.status}

                  </span>


                </p>





              </div>



            </div>




          </div>



        ))



      )}



      </div>



    </div>



    </>

  );

}


export default MyApplications;