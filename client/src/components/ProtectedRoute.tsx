import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ children }: any) {


  const token = localStorage.getItem("token");


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  const location = useLocation();



  // Not logged in

  if (!token) {

    return <Navigate to="/" />;

  }





  // Admin pages protection

  if (

    location.pathname.startsWith("/admin") ||

    location.pathname === "/create-job" ||

    location.pathname === "/manage-board" ||

    location.pathname === "/students"

  ) {


    if (

      user.role?.toLowerCase() !== "admin"

    ) {

      return <Navigate to="/student" />;

    }


  }





  // Student pages protection

  if (

    location.pathname === "/student" ||

    location.pathname === "/my-applications" ||

    location.pathname === "/profile"

  ) {


    if (

      user.role?.toLowerCase() === "admin"

    ) {

      return <Navigate to="/admin" />;

    }


  }





  return children;


}


export default ProtectedRoute;