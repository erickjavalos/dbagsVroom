import React, { useState, useEffect } from "react";
import namiImg from "../../images/nami.png";
import eternlImg from "../../images/eternl.png";
import NamiWallet from "../../utils/NamiWallet";
import EternlWallet from "../../utils/EternlWallet";
import Mfer from "../../assets/icon/Mfer.png";
import LoadingButton from "../../components/LoadingButton/";

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
      nami = new NamiWallet(window.cardano);
      eternl = new EternlWallet(window.cardano);

      // verify if nami is installed
      let namisInstalled = await nami.isInstalled();
      let eternlInstalled = await eternl.isInstalled();
      // set wallets
      if (namisInstalled) setNamisInstalled(true);
      if (eternlInstalled) setEternlInstalled(true);
    }

    verifyWallets();
  }, []);

  const connectWallet = async (option) => {
    // instantiate nami wallet
    if (option === "nami") {
      try {
        let isNamiConnected = await nami.enable();
        // set variables
        setWalletConnected("nami");
        // sets wallet to global variable in home for nami
        await updateWalletConnected(isNamiConnected);
      } catch (error) {
        console.log("User did not connect wallet");
      }
    }
    // instantiate eternl wallet
    else {
      try {
        let isEternlConnected = await eternl.enable();
        // set variables
        setWalletConnected("eternl");
        // sets wallet to global variable in home for eternl
        await updateWalletConnected(isEternlConnected);
      } catch (error) {
        console.log("User did not connect wallet");
      }
    }
    // remove the dropdown menu of wallets since we tried connecting
    setDropdownOpen(!isDropdownOpen);
  };

  // toggle dropdown when connect wallet button is pressed
  const dropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
<div className="flex flex-col bg-black text-white mb-4 relative">
  {/* Image in the top left corner */}
  <div className="container mx-auto flex items-center justify-between px-4">
    <div className="flex items-center">
      <img src={Mfer} alt="Logo" className="w-16 h-16 mr-2" />
    </div>
    {/* Buttons on the right */}
    <div className="flex items-center text-xl flex-row-reverse">
      {/* Verify user is logged in before allowing the user to connect the wallet */}
      {loggedIn ? (
        <>
          {/* Log out button */}
          <button className="mx-2" onClick={logout}>
            log out mfer
          </button>

          {/* Mfer wallet status */}
          <button className="mx-2" onClick={dropDown}>
            {walletConnected ? walletConnected + ' connected' : 'connect mfer wallet'}
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-black p-2 z-10 text-sm flex flex-col mx-1">
              {/* Show an option to connect to Namie if installed */}
              {namisInstalled && (
                <button onClick={() => connectWallet('nami')} className="flex flex-row">
                  {/* Add image and name */}
                  <img src={namiImg} alt="Nami" className="w-10 h-10 mr-2" />
                  <span className="flex items-center">Nami</span>
                </button>
              )}

              {/* Show an option to connect to Eternl if installed */}
              {eternlInstalled && (
                <button onClick={() => connectWallet('eternl')} className="flex flex-row">
                  {/* Add image and name */}
                  <img src={eternlImg} alt="eternl" className="w-10 h-10 mr-2" />
                  <span className="flex items-center">Eternl</span>
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        // Prompt the user to log back in
        <button
          className="mx-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href =
              'https://discord.com/api/oauth2/authorize?client_id=1106720134615289937&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20guilds%20email'
          }}
        >
          log in mfer
        </button>
      )}
    </div>
  </div>
</div>
  );
}

export default Header;
