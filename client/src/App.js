import React, {useState, useEffect} from 'react';
import { fromText, Lucid,Blockfrost } from "lucid-cardano";
import Header from './components/Header';
// TODO: may have to hide this api key later on for security reasons
const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprod537IKjHMy3Pots7uk6KKitjlUyIKGdw0"),
    "Preprod",
  );

function App() {
    const [walletConnected, setWalletConnected] = useState(null);

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
      const payload = fromText("Hello from Lucid!");

      // const signedMessage = await lucid.newMessage(address, payload).sign();
      // console.log(signedMessage)

      const tx = await lucid.newTx()
      console.log(tx)
        // .mintAssets({ [unit]: 1n })
        // .validTo(Date.now() + 200000)
        // .attachMintingPolicy(mintingPolicy)
        // .complete();
      // try {
      //   // const response = await fetch('/api/mint', {
      //   //   method: 'GET',
      //   //   headers: {
      //   //     'Content-Type': 'application/json',
      //   //   },
      //   // });
      //   // const data = await response.json();
      //   // console.log(data)
      //   const address = await lucid.wallet.address();
      //   const payload = fromText("Hello from Lucid!");

      //   const signedMessage = await lucid.newMessage(address, payload).sign();
      // }
      // catch {
      //   console.log('error')
      // }
    }

    return (

        <>
            <Header updateWalletConnected={updateWalletConnected}/>

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
    )
}

export default App;
