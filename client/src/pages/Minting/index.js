import React, { useState, useEffect } from "react";
import { Lucid, Blockfrost } from "lucid-cardano";
import blockfrostApiKey from "../../../config";
import Header from "../../components/Header";
import backgroundImage from "../../images/background_auto.png"
import NamiWalletApi, { Cardano } from "../../nami-js";


let nami;

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

const Minting = () => {
  // add mutation for getting hashed metadata 
  const [walletConnected, setWalletConnected] = useState(null);


  // Function to update walletConnected in the App component
  const updateWalletConnected = async (wallet) => {

    setWalletConnected(wallet);
  };

  const processMintRequest = async () => {
    const S = await Cardano();

    nami = new NamiWalletApi(
      S,
      window.cardano,
      blockfrostApiKey,
      walletConnected
    );

    const url = 'api/startMintDbags'; // replace with your API URL
    // const payload = {
    //   amount: '10',
    //   // Add other key-value pairs here
    // };

    try {
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add other headers here if needed (e.g., authentication)
      //   },
      //   body: JSON.stringify(payload),

      // });
      // get 10 assets from backend
      const response = await fetch(url)
      // deconstruct data
      const data = await response.json()

      // extract parameters
      const hashedMetadata = data.metaDataHash;
      // DANGEROUS IN PRODUCTION
      const metadata = data.metadata
      // get address
      let paymentAddress = await nami.getAddress(); // nami wallet address
      // extract minted assets
      const entries = Object.entries(metadata["721"]["91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1"]);
      // console.log(entries)
      let mintedAssets = []
      entries.forEach((asset) => {
        console.log(asset[0])
        mintedAssets.push(
          {
            assetName: asset[0],
            quantity: "1",
            policyId:
              "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1",
            policyScript:
              "8201828200581c98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b82051a02d518fb",

          }
        )
      })

      let recipients = [
        {
          address:
            "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6",
          amount: "1",
        }, // Seller Wallet, NFT price 10ADA
        {
          address: paymentAddress,
          amount: "0",
          // mintedAssets: [
          //   {
          //     assetName: assetName,
          //     quantity: "1",
          //     policyId:
          //       "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1",
          //     policyScript:
          //       "8201828200581c98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b82051a02d518fb",
          //   },
          // ],
          mintedAssets: mintedAssets
        }, // NFTs to be minted
      ]; // list of recipients

      // build transaction 
      try {
        // combine and build transaction
        const transaction = await nami.transaction({
          PaymentAddress: paymentAddress,
          recipients: recipients,
          metadata: metadata,
          metadataHash: hashedMetadata,
          addMetadata: false,
          utxosRaw: await nami.getUtxosHex(),
          multiSig: true,
        });
        // prompting user for signature
        const witnessBuyer = await nami.signTx(transaction, true);
        // submit metadata to the backend 
        console.log(witnessBuyer)
        console.log(transaction)

        // submit post request to mint
        try {
          const mintURL = "/api/submitMintDbags"
          // construct payload to push to server
          const payload = {
            witnessBuyer: witnessBuyer,
            transaction: transaction,
            metadata: JSON.stringify(metadata)
          }
          const response = await fetch(mintURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),


          })
          const data = await response.json()
          console.log(data)
        }
        catch (error) {
          console.log(error)
        }


        // const { data } = await submitMint({
        //   variables: {
        //     transaction: transaction,
        //     witnessSignature: witnessBuyer,
        //     autoInput: whip
        //   },
        // });
      }
      // do not proceed if issues occur and update database state
      catch (e) {
        // update database
        console.log("not signed, or error occured")
        console.log(e)
        return
      }

    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <div style={styles.container}>
      <div className="flex flex-col">
        <Header
          updateWalletConnected={updateWalletConnected}
          loggedIn={true}
        // logout={logout}
        />

        {walletConnected && (
          <div className="flex flex-wrap justify-center align-center m-8 " >
            <div className="flex flex-col text-white w-11/12 bg-[rgba(63,65,59,0.90)] rounded-lg">
              {/* title of Header */}
              {/* render assets */}
              <div className="flex flex-row text-center justify-center p-5 m-5">
                <div className="flex flex-col w-1/16 text-xl">
                  <button type="submit"
                    className="mx-1 text-white bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-lg px-4 py-2"
                    onClick={processMintRequest}
                  >
                    mint 10 assets
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Minting;
