import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';
import auth from '../../utils/auth';


const Home = () => {
    // const [accessToken, setAccessToken] = useState("");

    // helper functions
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        };

    return (
        <>
        Home
        {Auth.loggedIn() ? (
            <>
                <h1>User is logged in successfully!</h1>
                 <Link className="text-light items-center" to="/">
                    <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2" onClick={logout}>
                    Logout
                    </button>
                </Link> 
              {/* <Link className="text-light items-center" to="/api/games">
                <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  what2play
                </button>
              </Link>

              <Link className="text-light items-center" to="/me">
                <button onClick={refreshMe} className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  {Auth.getProfile().data.username}'s profile
                </button>
              </Link>
              <Link className="text-light items-center" to="/">
                <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2" onClick={logout}>
                  Logout
                </button>
              </Link> */}
            </>
            ) : (
              <>
                <div className="flex items-center justify-center h-screen bg-discord-gray text-white" >
                    <a id="login" href="https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify%20guilds" className="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75">
                        <i className="fa-brands fa-discord text-2xl"></i>
                        <span>Login with Discord</span>
                    </a>
                </div>
              {/* <Link className="text-light self-center" to="/api/games">
                <button className="bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  what2play
                </button>
              </Link>
              <Link className="self-center text-light" to="/login">
                <button className="headerButton bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  Log in
                </button>
              </Link>
              <Link className="self-center text-light" to="/signup">
                <button className="headerButton bg-[rgb(234,222,218)] hover:bg-[rgb(46,41,78)] text-black hover:text-[rgb(234,222,218)] font-bold py-2 px-4 rounded-full mx-2">
                  Sign up
                </button>
              </Link> */}
              </>
            )}            
        </>
    );
}

export default Home;