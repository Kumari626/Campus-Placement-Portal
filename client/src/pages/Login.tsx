import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      if (response.data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

      }

      toast.success("Login Successful");

      const role = response.data.user?.role;

      if (role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
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
          🎓 Placement Portal Login
        </h2>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Password
          </label>

          <div className="input-group">

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

<button
  type="button"
  className="btn btn-outline-secondary"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
          </div>

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3 mb-2">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="text-center mb-0">
          Don't have an account?{" "}
          <Link to="/register">
            Sign Up
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Login;