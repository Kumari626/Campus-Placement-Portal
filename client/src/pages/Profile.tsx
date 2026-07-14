import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function Profile() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {

    const getProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);

      } catch (error: any) {

        toast.error(
          error.response?.data?.message ||
          "Failed to load profile"
        );

      } finally {

        setLoading(false);

      }

    };

    getProfile();

  }, []);

  const uploadResume = async () => {

    if (!resume) {
      toast.error("Please select a resume");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("resume", resume);

      const response = await api.post(
        "/api/auth/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);

      setUser({
        ...user,
        resume: response.data.resume,
      });

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Resume Upload Failed"
      );

    }

  };
  return (

    <>

      <Navbar />

      <div className="container mt-5">

        <h1 className="text-center mb-4">
          👤 My Profile
        </h1>

        {loading ? (

          <div className="text-center">

            <div className="spinner-border text-primary"></div>

            <h5 className="mt-3">
              Loading Profile...
            </h5>

          </div>

        ) : user ? (

          <div
            className="card shadow-lg border-0 mx-auto"
            style={{ maxWidth: "500px" }}
          >

            <div className="card-body text-center">

              <div className="mb-3">

                <div
                  className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "90px",
                    height: "90px",
                    fontSize: "35px",
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

              </div>

              <h3 className="text-primary">
                {user.name}
              </h3>

              <p>
                📧 <b>Email:</b> {user.email}
              </p>

              <p>
                🎓 <b>Role:</b> {user.role}
              </p>

              <p>
                📄 <b>Resume:</b>{" "}
                {user.resume ? (
                  <span className="text-success">
                    {user.resume}
                  </span>
                ) : (
                  <span className="text-danger">
                    No Resume Uploaded
                  </span>
                )}
              </p>

              <input
                type="file"
                className="form-control mt-3"
                onChange={(e) =>
                  setResume(e.target.files?.[0] || null)
                }
              />

              <button
                className="btn btn-success mt-3"
                onClick={uploadResume}
              >
                Upload Resume
              </button>

            </div>

          </div>

        ) : (

          <h4 className="text-center text-muted">
            Profile Not Found
          </h4>

        )}

      </div>

    </>

  );
}

export default Profile;