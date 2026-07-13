import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async () => {

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const response = await api.put(
        "/auth/forgot-password",
        {
          email,
          password,
        }
      );

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Password Reset Failed"
      );

    }

  };
  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow-lg p-4"
        style={{ width: "400px" }}
      >

        <h2 className="text-center mb-4">
          🔑 Forgot Password
        </h2>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            New Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleReset}
        >
          Reset Password
        </button>

      </div>

    </div>

  );
}

export default ForgotPassword;