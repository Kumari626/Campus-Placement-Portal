import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    selectedStudents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/admin/statistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);

      } catch (error) {

        console.log(error);
        toast.error("Failed to load dashboard");

      } finally {

        setLoading(false);

      }

    };

    getStats();

  }, []);

  return (

    <>

      <Navbar />

      <div className="container mt-5">

        <h1 className="text-center mb-3">
          👨‍💼 Admin Dashboard
        </h1>

        <p className="text-center text-muted mb-5">
          Manage students, jobs and applications
        </p>

        {loading ? (

          <div className="text-center">

            <div className="spinner-border text-primary"></div>

            <h5 className="mt-3">
              Loading Dashboard...
            </h5>

          </div>

        ) : (

          <>

            {/* Statistics */}

            <div className="row mb-5">

              <div className="col-md-4 mb-3">

                <div className="card shadow border-0 text-center p-3">

                  <h2 className="text-primary">
                    💼 {stats.totalJobs}
                  </h2>

                  <h5>Total Jobs</h5>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="card shadow border-0 text-center p-3">

                  <h2 className="text-success">
                    📄 {stats.totalApplications}
                  </h2>

                  <h5>Total Applications</h5>

                </div>

              </div>

              <div className="col-md-4 mb-3">

                <div className="card shadow border-0 text-center p-3">

                  <h2 className="text-danger">
                    🎓 {stats.selectedStudents}
                  </h2>

                  <h5>Selected Students</h5>

                </div>

              </div>

            </div>
            {/* Management */}

            <div className="row">

              {/* Jobs */}

              <div className="col-md-3 mb-4">

                <div className="card shadow-lg border-0 h-100">

                  <div className="card-body text-center">

                    <h3>💼 Jobs</h3>

                    <p>Create and manage job postings</p>

                    <Link
                      to="/create-job"
                      className="btn btn-primary w-100"
                    >
                      Create Job
                    </Link>

                  </div>

                </div>

              </div>

              {/* Applications */}

              <div className="col-md-3 mb-4">

                <div className="card shadow-lg border-0 h-100">

                  <div className="card-body text-center">

                    <h3>📄 Applications</h3>

                    <p>Review student applications</p>

                    <Link
                      to="/admin-applications"
                      className="btn btn-success w-100"
                    >
                      View Applications
                    </Link>

                  </div>

                </div>

              </div>

              {/* Students */}

              <div className="col-md-3 mb-4">

                <div className="card shadow-lg border-0 h-100">

                  <div className="card-body text-center">

                    <h3>👨‍🎓 Students</h3>

                    <p>Manage registered students</p>

                    <Link
                      to="/students"
                      className="btn btn-dark w-100"
                    >
                      View Students
                    </Link>

                  </div>

                </div>

              </div>

              {/* Manage Board */}

              <div className="col-md-3 mb-4">

                <div className="card shadow-lg border-0 h-100">

                  <div className="card-body text-center">

                    <h3>📌 Manage Board</h3>

                    <p>Create, edit and delete placement notices</p>

                    <Link
                      to="/manage-board"
                      className="btn btn-warning w-100"
                    >
                      Open Board
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </>

  );

}

export default AdminDashboard;