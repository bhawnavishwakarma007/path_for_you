import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../components/Auth/AdminLoginPage";
import RegisterPage from "../components/Auth/RegisterPage";

const AuthRoutes = () => {
  return(
    <>
    <Routes>
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
     </ Routes>
    </>
  )
}

export default AuthRoutes;
