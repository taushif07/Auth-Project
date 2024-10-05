import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
};

export default App;
