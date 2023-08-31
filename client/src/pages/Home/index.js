import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import Header from "../../components/Header";
import Auth from "../../utils/auth";
import BuildMfer from "../../components/BuildMfer";
import backgroundImage from "../../images/background_auto.png"

import planetX from '../../assets/auto_assets/Background/PlanetX.png';
console.log(planetX)

// instantiate nami wallet class
import NamiWalletApi, { Cardano } from "../../nami-js";
import blockfrostApiKey from "../../../config.js";

// queries
import { GET_ASSETS } from "../../utils/mutations"

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

// Home Class
function Home() {

  const [walletConnected, setWalletConnected] = useState(null);
  const [assets, setAssets] = useState([]);
  const [getAssets, { error, data }] = useMutation(GET_ASSETS);


  // Function to update walletConnected in the App component
  const updateWalletConnected = async (wallet) => {
    // get assets from wallet
    const assetsData = await pollAssets(wallet);
    // set assets state to render in the front end
    setAssets(assetsData);
    // submit get request to backend
    setWalletConnected(wallet);
  };

  const pollAssets = async (wallet) => {
    // cardano interface
    const S = await Cardano();
    // initialize nami wallet helper class
    const nami = new NamiWalletApi(
      S,
      window.cardano,
      blockfrostApiKey,
      wallet
    );
    // poll for assets
    try {
      // poll based on address
      const { data } = await getAssets({
        variables: {
          address: await nami.getAddress()
        },
      });
      // extract assets
      const assets = data.getAssetsInWallet
      // resolve 
      return {
        dbagAssets: assets.dbags,
        autoAssets: assets.whips
      }
    }
    // return normally
    catch (e) {
      console.log("issue with polling assets")
      return
    }
    f
  };


  // helper functions
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <div style={styles.container}>
        <div className="flex flex-col">

          {/* ensure user is signed in */}
          {Auth.loggedIn() ? (
            <>

              {/* Display header */}
              <Header
                updateWalletConnected={updateWalletConnected}
                loggedIn={true}
                logout={logout}
              />
              {/* display building methodology */}
              {walletConnected && (
                <BuildMfer
                  assets={assets}
                  walletConnected={walletConnected}
                />
              )}
            </>
          ) : (
            <>
              {/* diaplay header */}
              <Header
                updateWalletConnected={updateWalletConnected}
                loggedIn={false}
              />
            </>
          )}
        </div>
      </div>

    </>
  );
}

export default Home;
