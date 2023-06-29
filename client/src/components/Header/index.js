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

  const onSubmit = () => {
    // setShowLoader(true)
    // setTimeout(() => setShowLoader(false), 1000)
  }


  const selectWallet = () => {

    setDropdownOpen(!isDropdownOpen);
  };

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


  return (
    <header className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Sample Minting Site</h1>
        <div className="relative">
          {loggedIn ? (
            <>
              <LoadingButton
                text="Submit"
                onSubmit={selectWallet}
                loading={showLoader}
                disabled={showLoader}
                walletConnected={walletConnected}

              />
              {/* <button
            onClick={selectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {walletConnected ? walletConnected + " connected" : "Connect Wallet"}
          </button> */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Log Mfer Out
              </button>
              {/* drop down menu if wallets are detected */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded">
                  {namisInstalled && (
                    <button
                      onClick={() => connectWallet('nami')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <img src={namiImg} alt="Nami" className="w-10 h-10 mr-2" />
                      <span className="flex items-center">
                        Nami
                      </span>
                    </button>
                  )}
                  {eternlInstalled && (
                    <button
                      onClick={() => connectWallet('eternl')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <img src={eternlImg} alt="eternl" className="w-10 h-10 mr-2" />
                      <span className="flex items-center">
                        Eternl
                      </span>
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=token&scope=identify%20guilds';
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Mfer In
            </button>
          )}
        </div>
      </div>
    </header>

  );
}

export default Header;