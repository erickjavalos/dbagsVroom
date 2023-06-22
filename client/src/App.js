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
                    {/* authentication */}
                    <Route path="/auth" element={<Authentication />} />
                    {/* default homepage */}
                    <Route path="/Home" element={<Home />} />

                    {/* <Route path="/auth/discord" element={<Signup />} /> */}

                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/api/games" element={<What2Play />} />
                    <Route
                        path="/me"
                        element={<Profile />}
                    />
                    <Route
                        path="/game"
                        element={<Game />}
                    /> */}
                </Routes>
            </Router>
        </>
    )

}



    