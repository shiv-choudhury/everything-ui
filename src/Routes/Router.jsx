import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import Login from "../Components/AuthFiles/Login";
import Signup from "../Components/AuthFiles/Signup";
import ForgotPassword from "../Components/AuthFiles/ForgotPassword";

import UnauthRoutes from "./UnauthRoutes";
import Dashboard from "../Components/Dashboard/Dashboard";
import Graphs from "../Components/Graphs/Graphs";
import Tables from "../Components/Tables/Tables";
import TodoList from "../Components/Todo/TodoList";
import Forms from "../Components/Form/Form";
import PageNotFound from "../Components/PageNotFound";
import AppLoader from "../Components/Loader";
import About from "../Components/About/About";

export default function Router() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Route>
        <Route element={<UnauthRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/about" element={<About />} />
          {/* 404 not found page for unknown routes */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
