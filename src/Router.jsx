import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";

export default function Router() {
  return (
    // <Suspense fallback={<PredflowLoader />}>
    <Routes>
      {/* <Route> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/" element={<Dashboard />} />

      {/* </Route> */}
    </Routes>
    // </Suspense>
  );
}
