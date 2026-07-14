import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminApplications() {

  const [applications, setApplications] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const getApplications = async () => {
    try {

      const response = await api.get(
        "/api/applications/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const updateStatus = async (
    id: string,
    status: "Selected" | "Rejected"
  ) => {

    try {

      await api.put(
        `/api/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Status Updated");

      getApplications();

    } catch (error) {

      console.log(error);

      alert("Failed to update status");

    }

  };

  const statusStyle = (status: string) => {

    if (status === "Selected") {
      return "badge bg-success";
    }

    if (status === "Rejected") {
      return "badge bg-danger";
    }

    return "badge bg-warning text-dark";

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h1 className="text-center mb-4">
          All Applications
        </h1>

        <div className="row">

          {applications.filter(app => app.job && app.student).length === 0 ? (

            <h4 className="text-center">
              No Applications Found
            </h4>

          ) : (

            applications
              .filter((app) => app.job && app.student)
              .map((app) => (

                <div
                  className="col-md-6 mb-4"
                  key={app._id}
                >

                  <div className="card shadow">

                    <div className="card-body">

                      <h3>
                        {app.job?.title}
                      </h3>

                      <p>
                        <b>Company:</b> {app.job?.company}
                      </p>

                      <p>
                        <b>Student:</b> {app.student?.name}
                      </p>

                      <p>
                        <b>Email:</b> {app.student?.email}
                      </p>

                      <p>
                        <b>Status:</b>{" "}
                        <span className={statusStyle(app.status)}>
                          {app.status}
                        </span>
                      </p>

                      <button
                        className="btn btn-success me-2"
                        onClick={() =>
                          updateStatus(app._id, "Selected")
                        }
                      >
                        Select
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          updateStatus(app._id, "Rejected")
                        }
                      >
                        Reject
                      </button>

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

export default AdminApplications;