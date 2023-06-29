import React, { useState, useEffect } from 'react';
import namiImg from "../../images/nami.png";
import eternlImg from "../../images/eternl.png";
import NamiWallet from "../../utils/NamiWallet";
import EternlWallet from "../../utils/EternlWallet";
import LoadingButton from '../../components/LoadingButton/'

// let nami and eternl wallet be a global variable that can be access all throughout the app
let nami = null;
let eternl = null;

// header component
function Header({ updateWalletConnected, loggedIn, logout }) {
  // displays wallet connectvity
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // keep track of which wallets are installed in the browser
  const [namisInstalled, setNamisInstalled] = useState(true);
  const [eternlInstalled, setEternlInstalled] = useState(true);
  // used to concatenate wallet name to header area
  const [walletConnected, setWalletConnected] = useState(null);
  
  // sets up which wallets we can enable and disable
  useEffect(() => {
    // verify if nami is installed
    async function verifyWallets() {
      // instantiate nami wallet
      nami = new NamiWallet(window.cardano)
      eternl = new EternlWallet(window.cardano)

      // verify if nami is installed
      let namisInstalled = await nami.isInstalled()
      let eternlInstalled = await eternl.isInstalled()
      // set wallets 
      if (namisInstalled) setNamisInstalled(true)
      if (eternlInstalled) setEternlInstalled(true)
    }

    verifyWallets()

  }, [])  

  const connectWallet = async (option) => {
    // instantiate nami wallet
    if (option === 'nami') {
      try {
        let isNamiConnected = await nami.enable()
        // set variables
        setWalletConnected("nami")
        // sets wallet to global variable in home for nami
        await updateWalletConnected(isNamiConnected)


      }
      catch (error) {
        console.log('User did not connect wallet')
      }
    }
    // instantiate eternl wallet
    else {
      try {
        let isEternlConnected = await eternl.enable()
        // set variables
        setWalletConnected("eternl")
        // sets wallet to global variable in home for eternl
        await updateWalletConnected(isEternlConnected)
      }
      catch (error) {
        console.log('User did not connect wallet')
      }
    }
    // remove the dropdown menu of wallets since we tried connecting
    setDropdownOpen(!isDropdownOpen);
  };

  // toggle dropdown when connect wallet button is pressed
  const dropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

  return (
    <>
      <div className="flex flex-col">
      {/* verify user is logged in before allowing user to connect wallet */}
      {loggedIn ? (
          <>
            {/* note: set these up backwards to allow it to render on the right hand side of page */}
            <div className="flex flex-row-reverse text-white text-lg m-2">
              {/* log out button */}
              <div>
                <button 
                  className='mx-2'
                  onClick={logout}
                >
                    Log Mfer Out
                </button>
              </div>
              {/* mfer wallet status */}
              <div>
                <button 
                  className='mx-2'
                  onClick={dropDown}
                >
                    {walletConnected ? walletConnected + " connected" : "Connect Mfer Wallet"}
                </button>
                
              </div>
            </div>

            {/* dropdown */}
            {isDropdownOpen && (
              <>
                <div className="flex flex-row-reverse text-white">
                  <div className='flex flex-col mx-5'>
                    {/* show option to connect to namie if installed */}
                    {namisInstalled && (
                      <>
                      <button
                        onClick={() => connectWallet('nami')}
                        className='flex flex-row'
                      >
                        {/* add image and name */}
                        <img src={namiImg} alt="Nami" className="w-10 h-10 mr-2" />
                        <span className="flex items-center">
                          Nami
                        </span>
                      </button>
                      </>
                    )}
                    {/* show option to connect to eternl if installed */}
                    {eternlInstalled && (
                      <button
                        onClick={() => connectWallet('eternl')}
                        className='flex flex-row'
                      >
                        {/* add image and name */}
                        <img src={eternlImg} alt="eternl" className="w-10 h-10 mr-2" />
                        <span className="flex items-center">
                          Eternl
                        </span>
                      </button>
                    )}
                  </div>
              
                </div>
              </>
              )}
          </>
      ) : (
        // prompt user to log back in 
        <div className="flex flex-row-reverse text-white text-lg m-2">
          <div>
              <button 
                className='mx-2'
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify%20guilds'
                }}
              >
                  Log Mfer In
              </button>
            </div>
          </div>
      )}
        
      </div>
    </>

  );
}

export default Header;