import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Auth from "../../utils/auth";

const Authentication = () => {
  useEffect(() => {
    const verifyHash = async () => {
      const query = window.location.hash;
      if (query) {
        console.log('hit')
        const params = query.split("&");
            // get access token and expiration from params
            let accessToken = ""
            let expiration = ""
            // loop through params and find access tokens and expiration time 
            for (const param of params) {
                const [key, value] = param.split("=");
                if (key === "access_token") {
                    accessToken = value
                }
                if (key === "expires_in")
                {
                    expiration = value
                }
            }
            // authenticate and store access token and expiration time in local storage
            Auth.login(accessToken, Date.now()/1000 + parseInt(expiration))

        // Discord hash verification
        // const params = query.split("&");
        // let hash = "";

        // for (const param of params) {
        //   const [key, value] = param.split("=");
        //   if (key === "hash") {
        //     hash = value;
        //     break;
        //   }
        // }

        // try {
        //   // Send verification request to backend
        //   const response = await axios.post("/api/verify", { hash });
        //   const { username, email, token } = response.data;

        //   // Store user information and JWT in local storage
        //   localStorage.setItem("username", username);
        //   localStorage.setItem("email", email);
        //   localStorage.setItem("jwtToken", token);

        //   const decodedToken = jwt_decode(token);
        //   console.log(decodedToken);

        //   // Perform other actions after successful verification and JWT storage
        // } catch (error) {
        //   // Handle verification error
        //   console.error(error);
        // }
      } else {
        // Check if access token and expiration exist in URL search parameters
        const accessToken = new URLSearchParams(window.location.search).get(
          "access_token"
        );
        const expiresIn = new URLSearchParams(window.location.search).get(
          "expires_in"
        );

        if (accessToken && expiresIn) {
          const expiration = Date.now() / 1000 + parseInt(expiresIn);
          // Authenticate and store access token and expiration in local storage
          Auth.login(accessToken, expiration);
        }
      }
    };

    verifyHash();
  }, []);

  return <></>;
};

export default Authentication;
