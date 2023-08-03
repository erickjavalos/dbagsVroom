import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';




import Auth from "../../utils/auth";

const Authentication = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const navigate = useNavigate();


  useEffect(async () => {
    const verifyHash = async () => {
      // get code from query parameter
      const code = queryParams.get("code")
      // attempt to login
      if (code)
      {
        // use mutation
        console.log('yee')
        // perform a login to our database
      }
      

      // navigate('/home', { replace: true })

      
      // if (query) {
      //   console.log('hit')
      //   const params = query.split("&");
      //       // get access token and expiration from params
      //       let accessToken = ""
      //       let expiration = ""
      //       // loop through params and find access tokens and expiration time 
      //       for (const param of params) {
      //           const [key, value] = param.split("=");
      //           if (key === "access_token") {
      //               accessToken = value
      //           }
      //           if (key === "expires_in")
      //           {
      //               expiration = value
      //           }
      //       }
      //       // authenticate and store access token and expiration time in local storage
      //       Auth.login(accessToken, Date.now()/1000 + parseInt(expiration))

      // } else {
      //   // Check if access token and expiration exist in URL search parameters
      //   const accessToken = new URLSearchParams(window.location.search).get(
      //     "access_token"
      //   );
      //   const expiresIn = new URLSearchParams(window.location.search).get(
      //     "expires_in"
      //   );

      //   if (accessToken && expiresIn) {
      //     const expiration = Date.now() / 1000 + parseInt(expiresIn);
      //     // Authenticate and store access token and expiration in local storage
      //     Auth.login(accessToken, expiration);
      //   }
      // }
    };

    verifyHash();
  }, []);

  return <></>;
};

export default Authentication;
