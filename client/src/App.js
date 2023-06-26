import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Authentication from './components/Authentication/index.js';
import Home from './pages/Home';


// import input from './input.css' ;
import './dist/output.css'



export default function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/Home" element={<Home />} />
                </Routes>
            </Router>
        </>
    )

}



