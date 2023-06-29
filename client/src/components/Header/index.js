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
  const [showLoader, setShowLoader] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [namisInstalled, setNamisInstalled] = useState(true);
  const [eternlInstalled, setEternlInstalled] = useState(true);
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
    setShowLoader(true)
    console.log(`connecting ${option}`)
    // instantiate nami wallet
    if (option === 'nami') {
      try {
        let isNamiConnected = await nami.enable()
        setWalletConnected("nami")
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
        setWalletConnected("eternl")
        await updateWalletConnected(isEternlConnected)
      }
      catch (error) {
        console.log('User did not connect wallet')
        updateWalletConnected("true")
      }
    }
    setDropdownOpen(!isDropdownOpen);
    setShowLoader(false)
  };

  // XOR drop down
  const dropDown = () => {
    console.log("dropping down pressed")
    setDropdownOpen(!isDropdownOpen);
  }

  return (
    <>
      <div className="flex flex-col">
      {loggedIn ? (
          <>
            <div className="flex flex-row-reverse text-white text-lg m-2">
              <div>
                <button 
                  className='mx-2'
                  onClick={logout}
                >
                    Log Mfer Out
                </button>
              </div>

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
                {console.log("drop")}
                <div className="flex flex-row-reverse text-white">
                  <div className='flex flex-col mx-5'>
                    {namisInstalled && (
                      <>
                      <button
                        onClick={() => connectWallet('nami')}
                        className='flex flex-row'
                        // className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <img src={namiImg} alt="Nami" className="w-10 h-10 mr-2" />
                        <span className="flex items-center">
                          Nami
                        </span>
                      </button>
                      </>
                    )}
                    {eternlInstalled && (
                      <button
                        onClick={() => connectWallet('eternl')}
                        className='flex flex-row'
                        // className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
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