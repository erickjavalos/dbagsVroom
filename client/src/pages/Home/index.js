import React, {useState, useEffect} from 'react';
import { fromText, Lucid,Blockfrost } from "lucid-cardano";
import Header from '../../components/Header';
import Auth from '../../utils/auth';


// import nami 

import NamiWalletApi, { Cardano } from '../../nami-js';
import blockfrostApiKey from '../../../config.js'; 
let nami;


// TODO: may have to hide this api key later on for security reasons
const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodEfV6mA9d1Mkavc5XRYmFGsPdqAfj1HGx"),
    "Preprod",
  );

function Home() {
    const [walletConnected, setWalletConnected] = useState(null);

    // Function to update walletConnected in the App component
    const updateWalletConnected = async (wallet) => {
      setWalletConnected(wallet);
      lucid.selectWallet(wallet);
      console.log(await lucid.wallet.address())
    };


    const processMintRequest = async () => {
      // get hashed metadata
      const S = await Cardano();
      nami = new NamiWalletApi(
          S,
          window.cardano,
          blockfrostApiKey
      )

      const address = await lucid.wallet.address();
      console.log(address)

      // ping backend to initiate mint
      const mint = await fetch('/api/mint/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await mint.json();
      const hashedMeta = data.metaDataHash

      let paymentAddress = await nami.getAddress() // nami wallet address
      console.log(hashedMeta)
      console.log(paymentAddress)

      let recipients = [
          {address: "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6", amount: "10"}, // Seller Wallet, NFT price 10ADA
          {address: paymentAddress,  amount: "0",
            mintedAssets:[
                {
                  "assetName":"Test1",
                  "quantity":"1",
                  "policyId":"91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1",
                  "policyScript":"8201828200581c98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b82051a02d518fb"
              }
          ]} // NFTs to be minted
          ] // list of recipients

      let dummyMetadata =  {"721":
          {"36aa169af7dc9bb5a566987191221f2d7a92aab211350f7119fc1541": // policyId
          {"Test1": // NFTName
          {"name":"sfgsdfgdfsg",
          "description":"gsdffsgdfsgdfsgdfsg",
          "image":"isdgdfsgafsgdfdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfgdfgdfsgdfsgdfsgdfsg"}}
          }
      }
    

      let transaction = await nami.transaction( 
          {
              PaymentAddress : paymentAddress, 
              recipients : recipients,
              metadata : dummyMetadata, 
              metadataHash : hashedMeta, 
              addMetadata : false, 
              utxosRaw : (await nami.getUtxosHex()),
              multiSig : true
          }
      ) 


      // console.log("trying to sign transaction")
      const witnessBuyer = await nami.signTx(transaction, true)
      const jsonData = {
        "witnessBuyer" : witnessBuyer,
        "transaction" : transaction
      }

      // console.log(jsonData)
      // send data to the backend
      const processMint = await fetch('/api/mint/processMint', {
        method: 'POST',
        body: JSON.stringify({
          "witnessBuyer" : witnessBuyer,
          "transaction" : transaction
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(jsonData)
      
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
