import React, {useState, useEffect} from 'react';
import { fromText, Lucid,Blockfrost } from "lucid-cardano";
import Header from '../../components/Header';
import Auth from '../../utils/auth';


// TODO: may have to hide this api key later on for security reasons
const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodEfV6mA9d1Mkavc5XRYmFGsPdqAfj1HGx"),
    "Preprod",
  );

function Home() {
    const [walletConnected, setWalletConnected] = useState(null);

    const getDerivedStateFromError=(error)=> {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
    const  componentDidCatch = (error, info)=> {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      logErrorToMyService(error, info.componentStack);
    }

    // Function to update walletConnected in the App component
    const updateWalletConnected = async (wallet) => {
      setWalletConnected(wallet);
      lucid.selectWallet(wallet);
      console.log(await lucid.wallet.address())
    };


    const processMintRequest = async () => {
      console.log('minting')
      // get hashed metadata

      const address = await lucid.wallet.address();
      console.log(address)

      // ping backend
      const mint = await fetch('/api/mint/', {
        headers: {
          'Content-Type': 'application/json',
          // authorization: `Bearer ${token}`,
        },
      });
      // const data = mint.json()
      const data = await mint.json();
      console.log(data)


      // const payload = fromText("Hello from Lucid!");

      // const tx = await lucid.newTx()
      // console.log(tx)
    }
    // helper functions
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    // useEffect()
    // {
      
    // }

    return (
        <>

          {Auth.loggedIn() ? (
            <>
              <Header updateWalletConnected={updateWalletConnected} loggedIn={true} logout={logout}/>

              {walletConnected === null ? 
                <h1>Wallet not connected</h1> 
                :
                <section className="bg-gray-200 p-4 flex justify-center items-center">
                  <div className="container mx-auto">
                    <button 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={processMintRequest}
                    >
                      Mint
                    </button>
                  </div>
                </section>
              }
            </>
            ) :
            (
            <>
              <Header updateWalletConnected={updateWalletConnected} loggedIn={false}/>

            </>              
            )}

        </>
    )
}

export default Home;
