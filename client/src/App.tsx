import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateJob from "./pages/CreateJob";
import MyApplications from "./pages/MyApplications";
import AdminApplications from "./pages/AdminApplications";
import Students from "./pages/Students";
import ManageBoard from "./pages/ManageBoard";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>


        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />



        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin-applications"
          element={
            <ProtectedRoute>
              <AdminApplications />
            </ProtectedRoute>
          }
        />



        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />



        <Route
          path="/manage-board"
          element={
            <ProtectedRoute>
              <ManageBoard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;