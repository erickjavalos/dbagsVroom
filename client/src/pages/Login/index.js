import React, { useState, useEffect } from 'react';

// login page 
const Login = () => {

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-discord-gray">
                {/* https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20guilds%20email */}
                <a
                    id="login"
                    href="https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify%20guilds"
                    className="bg-discord-blue text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75"
                >
                    <i className="fa-brands fa-discord text-2xl"></i>
                    <span>Login with Discord</span>
                </a>
            </div>

        </>
    );
}

export default Login;