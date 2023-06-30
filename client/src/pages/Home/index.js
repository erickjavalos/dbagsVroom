import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Auth from "../../utils/auth";
import backgroundImage from "../../assets/auto_assets/Background/Trippymferforest.png"


import NamiWalletApi, { Cardano } from "../../nami-js";
import blockfrostApiKey from "../../../config.js";
let nami;


const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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

  // Function to update walletConnected in the App component
  const updateWalletConnected = async (wallet) => {
    // get assets from wallet
    const assetsData = await getAssets();
    // set assets state to render in the front end
    setAssets(assetsData);
    console.log(assetsData);
    // submit get request to backend
    setWalletConnected(wallet);
    console.log("wallet was set");
  };

  const getAssets = async () => {
    // TODO: Need to poll the blockchain here for all assets (O(N) look up time)
    const testdata = {
      dbagAssets: ["dbagMfer1", "dbagMfer2", "dbagMfer6969"],
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
    const assets = await fetch("/api/projectData/getSelectedMetaData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testdata),
    });

    const data = await assets.json();

    return data;
  };

  const processMintRequest = async () => {
    // get hashed metadata
    console.log("gettin address");
    // instantiate serialization lib that helps decode blockchain data
    const S = await Cardano();
    // initialize nami wallet helper class
    nami = new NamiWalletApi(
      S,
      window.cardano,
      blockfrostApiKey,
      walletConnected
    );

    // GET hashed metadata
    const mint = await fetch("/api/mint/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // extract data
    const data = await mint.json();
    // extract hashed metadata
    const hashedMeta = data.metaDataHash;

    // extract payment address
    let paymentAddress = await nami.getAddress(); // nami wallet address

    // ********************************************
    // Build Transaction
    // ********************************************

    // build recipients
    let recipients = [
      {
        address:
          "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6",
        amount: "10",
      }, // Seller Wallet, NFT price 10ADA
      {
        address: paymentAddress,
        amount: "0",
        mintedAssets: [
          {
            assetName: "Test1",
            quantity: "1",
            policyId:
              "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1",
            policyScript:
              "8201828200581c98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b82051a02d518fb",
          },
        ],
      }, // NFTs to be minted
    ]; // list of recipients
    // build fake metadata to help estimate gas fees (use maximum packet size to be safe)
    let dummyMetadata = {
      721: {
        // policyId
        "36aa169af7dc9bb5a566987191221f2d7a92aab211350f7119fc1541": {
          // NFTName
          Test1: {
            name: "sfgsdfgdfsg",
            description: "gsdffsgdfsgdfsgdfsg",
            image:
              "isdgdfsgafsgdfdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfgdfgdfsgdfsgdfsgdfsg",
          },
        },
      },
    };

    console.log("building transaction...");
    // combine and build transaction
    let transaction = await nami.transaction({
      PaymentAddress: paymentAddress,
      recipients: recipients,
      metadata: dummyMetadata,
      metadataHash: hashedMeta,
      addMetadata: false,
      utxosRaw: await nami.getUtxosHex(),
      multiSig: true,
    });
    console.log("SUCCESS: transaction built!");

    // prompt user to sign and retreive signature hash
    console.log("Prompting user to sign");
    const witnessBuyer = await nami.signTx(transaction, true);
    console.log("SUCCESS: user signed transaction");

    // send witness buyer signature and transaction to backend to submit to chain
    console.log("Asset minting...");
    const processMint = await fetch("/api/mint/processMint", {
      method: "POST",
      body: JSON.stringify({
        witnessBuyer: witnessBuyer,
        transaction: transaction,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
            <Header
              updateWalletConnected={updateWalletConnected}
              loggedIn={true}
              logout={logout}
            />

            
            <div style={styles.containerStyle}>
              <div style={styles.card} className="text-2xl">Buidl Mfer</div>
            </div>

            {/* {walletConnected !== null &&  (
              <>
                <div style={styles.card}>
                  
                </div>
              </>
              // <section className="bg-gray-200 p-4 flex justify-center items-center">
              //   <div className="container mx-auto">
              //     <button
              //       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              //       onClick={processMintRequest}
              //     >
              //       Mint
              //     </button>
              //   </div>
              // </section>
            )} */}
          </>
        ) : (
          <>
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
