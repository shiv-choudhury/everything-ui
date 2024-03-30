import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import Graphs from "./Components/Graphs/Graphs";
import Tables from "./Components/Tables/Tables";
import TodoList from "./Components/Todo/TodoList";
import Forms from "./Components/Form/Form";

export default function Router() {
  return (
    // <Suspense fallback={<PredflowLoader />}>
    <Routes>
      {/* <Route> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/graphs" element={<Graphs />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/todolist" element={<TodoList />} />
      <Route path="/forms" element={<Forms />} />

      {/* </Route> */}
    </Routes>
    // </Suspense>
  );
}
