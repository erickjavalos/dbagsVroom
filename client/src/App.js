import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";


import Login from "./pages/Login";
import Authentication from "./components/Authentication/index.js";
import Home from "./pages/Home";

// import input from './input.css' ;
import "./dist/output.css";

export default function App() {
  return (
    <>
      <h1 className="bg-red-100">Very light red</h1>
      <h1 className="bg-red-200">Light red</h1>
      <h1 className="bg-red-300">Medium light red</h1>
      <h1 className="bg-red-400">Medium red</h1>
      <h1 className="bg-red-500">Default red</h1>
      <h1 className="bg-red-600">Medium dark red</h1>
      <h1 className="bg-red-700">Dark red</h1>
      <h1 className="bg-red-800">Very dark red</h1>
      <h1 className="bg-red-900">Almost black red</h1>

      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          {/* authentication */}
          <Route path="/auth" element={<Authentication />} />
          {/* default homepage */}
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
