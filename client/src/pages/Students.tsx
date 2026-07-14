import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Students() {

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {

    const getStudents = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/api/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    getStudents();

  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Registered Students
        </h2>

        <table className="table table-bordered table-striped">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student._id}>

                <td>{student.name}</td>

                <td>{student.email}</td>

                <td>{student.role}</td>

                <td>

                  {student.resume ? (

                    <a
                      className="btn btn-primary btn-sm"
                      href={`http://localhost:5000/uploads/${student.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume
                    </a>

                  ) : (

                    <span>No Resume</span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
}

export default Students;