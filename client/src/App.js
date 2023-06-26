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
import Minting from "./pages/Minting";

// import input from './input.css' ;
import "./dist/output.css";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          {/* authentication */}
          <Route path="/auth" element={<Authentication />} />
          {/* default homepage */}
          <Route path="/Home" element={<Home />} />
          <Route path="/minting" element={<Minting />} />
        </Routes>
      </Router>
    </>
  );
}
