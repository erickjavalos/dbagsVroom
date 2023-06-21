import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';
import auth from '../../utils/auth';


const Authentication = () => {
    // const [accessToken, setAccessToken] = useState("");
    const [expiration, setExpiration] = useState("");

    useEffect(() => {
        // get has returned from discord
        console.log('authentication hit')
        const query = window.location.hash;
        // verify if query exists 
        if (query) {
            // split query into array of params
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

        }
        }, [window.location.search])

    return (
        <>         
        </>
    );
}

export default Authentication;