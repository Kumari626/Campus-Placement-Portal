import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Navbar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };



  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">


        <Link
          className="navbar-brand fw-bold"
          to="/student"
        >
          🎓 Placement Portal
        </Link>



        <button
          className="navbar-toggler"
          onClick={() => setOpen(!open)}
        >

          <span className="navbar-toggler-icon"></span>

        </button>



        <div className={`collapse navbar-collapse ${open ? "show":""}`}>


          <div className="ms-auto d-flex gap-2 flex-wrap">


            {
              user.role === "admin" ? (

                <>

                  <Link
                    className="btn btn-outline-light"
                    to="/admin"
                  >
                    👨‍💼 Admin Dashboard
                  </Link>


                </>


              ) : (

                <>

                  <Link
                    className="btn btn-outline-light"
                    to="/student"
                  >
                    🏠 Dashboard
                  </Link>


                  <Link
                    className="btn btn-outline-light"
                    to="/my-applications"
                  >
                    📄 My Applications
                  </Link>


                  <Link
                    className="btn btn-outline-light"
                    to="/profile"
                  >
                    👤 My Profile
                  </Link>

                </>

              )

            }



            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>



          </div>


        </div>


      </div>


    </nav>

  );

}


export default Navbar;