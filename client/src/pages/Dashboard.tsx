import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(".api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    getProfile();

  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div>
      <h1>Campus Management Dashboard</h1>

      {user && (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;