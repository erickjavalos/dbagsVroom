import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from "../../utils/auth"
import backgroundImage from "../../images/background_auto.png"


const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    width: '100vw',
    height: '100vh',
    // position: 'relative', // Added to make the position relative for absolute positioning of the header
    fontFamily: 'architects daughter'
  }
}

const Authentication = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const [login, { error, data }] = useMutation(LOGIN_USER);



  useEffect(async () => {
    const verifyHash = async () => {
      // get code from query parameter
      const code = queryParams.get("code")
      // attempt to login
      if (code) {
        // use mutation
        console.log("Authenticating....")
        try {
          const { data } = await login({
            variables: { code: code },
          });
          console.log("Authenticated!")
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
          // window.location.assign('/join');
        }
      }

    };

    verifyHash();
  }, []);

  return <>
    <div style={styles.container}>
    </div>
  </>;
};

export default Authentication;
