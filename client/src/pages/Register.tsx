import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async () => {

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }
  
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
  
      const response = await api.post("/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
  
      // Save Token
      localStorage.setItem(
        "token",
        response.data.token
      );
  
      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
  
      toast.success("Account Created Successfully");
  
      if (
        response.data.user.role.toLowerCase() === "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
  
    } catch (error: any) {
  
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
  
    }
  
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow-lg p-4" style={{ width: "420px" }}>

        <h2 className="text-center mb-4">
          📝 Sign Up
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />

        <select
          className="form-select mb-3"
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="btn btn-success w-100"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;