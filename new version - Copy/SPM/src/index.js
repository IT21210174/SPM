 import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "views/Login";
import Register from "views/Register";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Code Aanlyzer</title>
      
    </Helmet>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          

          {/* <Route path="/admin/*" element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }/> */}

        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);


export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return(<Navigate to="/admin/dashboard"/>
    )
  } else {
    return <Navigate to="/login" />;
  }
}

