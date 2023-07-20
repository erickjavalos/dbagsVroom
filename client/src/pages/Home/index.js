import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Auth from "../../utils/auth";
import BuildMfer from "../../components/BuildMfer";
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
  },
  containerStyle: {
    height: '100vh', // Set the container to fill the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
  },
  card: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    color: 'white',
    width: '90%',
    height: '60%',
    // margin: '0 auto',
    padding: '15px',
    boxSizing: 'border-box',
    borderRadius: '20px', // Set border radius to create rounded edges

  }

}


function Home() {
  
  const [walletConnected, setWalletConnected] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(async () => {
    const assetsData = await getAssets();
    setAssets(assetsData);
  }, [])
  // Function to update walletConnected in the App component
  const updateWalletConnected = async (wallet) => {
    // get assets from wallet
    const assetsData = await getAssets();
    // set assets state to render in the front end
    setAssets(assetsData);
    // console.log(assetsData);
    // submit get request to backend
    setWalletConnected(wallet);
  };

  const getAssets = async () => {
    // TODO: Need to poll the blockchain here for all assets (O(N) look up time)
    const testdata = {
      dbagAssets: ["dbagMfer1000", "dbagMfer1", "dbagMfer2", "dbagMfer5", "dbagMfer6"],
      // autoAssets: [
      //   '446261674d666572734175746f436c75623039363537',
      //   '446261674d666572734175746f436c75623031333637',
      //   '446261674d666572734175746f436c75623132333836',
      //   '446261674d666572734175746f436c75623133383535',
      //   '446261674d666572734175746f436c75623039343934'
      // ]
      autoAssets: [
        '446261674d666572734175746f436c75623039363537',
        '446261674d666572734175746f436c75623031333637',
        '446261674d666572734175746f436c75623132333836',
        '446261674d666572734175746f436c75623130363838',
        '446261674d666572734175746f436c75623035323935',
        '446261674d666572734175746f436c75623133383535',
        '446261674d666572734175746f436c75623032303030',
        '446261674d666572734175746f436c75623031313739',
        '446261674d666572734175746f436c75623034323736',
        '446261674d666572734175746f436c75623131393739',
        '446261674d666572734175746f436c75623038313237',
        '446261674d666572734175746f436c75623036313232',
        '446261674d666572734175746f436c75623132313537',
        '446261674d666572734175746f436c75623030303137',
        '446261674d666572734175746f436c75623036343236',
        '446261674d666572734175746f436c75623132373830',
        '446261674d666572734175746f436c75623036393438',
        '446261674d666572734175746f436c75623131343639',
        '446261674d666572734175746f436c75623032373131',
        '446261674d666572734175746f436c75623131313834',
        '446261674d666572734175746f436c75623030383032',
        '446261674d666572734175746f436c75623037313539',
        '446261674d666572734175746f436c75623131323136',
        '446261674d666572734175746f436c75623032323238',
        '446261674d666572734175746f436c75623034313039',
        '446261674d666572734175746f436c75623131373934',
        '446261674d666572734175746f436c75623030363234',
        '446261674d666572734175746f436c75623032343536',
        '446261674d666572734175746f436c75623131363832',
        '446261674d666572734175746f436c75623130333233',
        '446261674d666572734175746f436c75623037303030',
        '446261674d666572734175746f436c75623037393530',
        '446261674d666572734175746f436c75623035383439',
        '446261674d666572734175746f436c75623036353334',
        '446261674d666572734175746f436c75623035383330',
        '446261674d666572734175746f436c75623031363136',
        '446261674d666572734175746f436c75623037333038',
        '446261674d666572734175746f436c75623132393531',
        '446261674d666572734175746f436c75623030383730',
        '446261674d666572734175746f436c75623032363835',
        '446261674d666572734175746f436c75623034323835',
        '446261674d666572734175746f436c75623130323839',
        '446261674d666572734175746f436c75623033333637',
        '446261674d666572734175746f436c75623131323739',
        '446261674d666572734175746f436c75623039353130',
        '446261674d666572734175746f436c75623038333532',
        '446261674d666572734175746f436c75623033353232',
        '446261674d666572734175746f436c75623131393536',
        '446261674d666572734175746f436c75623035363731',
        '446261674d666572734175746f436c75623131393530',
        '446261674d666572734175746f436c75623036383539',
        '446261674d666572734175746f436c75623039363736',
        '446261674d666572734175746f436c75623131393935',
        '446261674d666572734175746f436c75623132393736',
        '446261674d666572734175746f436c75623037313238',
        '446261674d666572734175746f436c75623035373231',
        '446261674d666572734175746f436c75623033383037',
        '446261674d666572734175746f436c75623031323936'
      ]
    };
    

    return testdata;
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
