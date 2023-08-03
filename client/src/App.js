import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Authentication from "./components/Authentication/index.js";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Minting from "./pages/Minting";

import './App.css'


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <>
      
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/minting" element={<Minting />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}
