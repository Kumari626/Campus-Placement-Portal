import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(
  document.getElementById("app")!
).render(

  <React.StrictMode>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <App />

  </React.StrictMode>

);