// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Authentication from './components/Authentication';
import Home from './pages/Home';



function App() {
  return (
    <>
     <Router>
      <Routes>
          <Route path="/Login" element={<Login />} />
          {/* authentication */}
          <Route path="/auth/discord" element={<Authentication />} />
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
  );
}

export default App;
