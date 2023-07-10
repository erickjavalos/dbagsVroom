import React, { useEffect, useState } from "react";
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
import './App.css'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/minting" element={<Minting />} />
        </Routes>
      </Router>
    </>
  );
}
