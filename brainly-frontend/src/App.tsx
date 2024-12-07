import { useState } from "react";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
