import React, { useEffect } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from "../../utils/auth";
import backgroundImage from "../../images/background_auto.png";

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    width: '100vw',
    height: '100vh',
    fontFamily: 'architects daughter'
  }
};

const Authentication = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const [login, { error }] = useMutation(LOGIN_USER);

  const verifyHash = async () => {
    const code = queryParams.get("code");
    if (code) {
      try {
        const { data: loginData } = await login({
          variables: { code: code },
        });
        Auth.login(loginData.login.token);
      } catch (e) {
        console.error(e);
        window.location.assign('/join'); // Redirect to appropriate URL on error
      }
    }
  };

  useEffect(() => {
    verifyHash();
  }, []);

  return <div style={styles.container}></div>;
};

export default Authentication;

