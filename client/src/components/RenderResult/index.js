import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';

import ConstructMfer from '../../utils/ConstructMfer';

import NamiWalletApi, { Cardano } from "../../nami-js";
import blockfrostApiKey from "../../../config.js";

import { MINT, SUBMIT_MINT } from "../../utils/mutations"
let nami;


function removeTypename(obj) {
  // Check if the input is an object
  if (typeof obj === 'object' && obj !== null) {
    // Create a new object to hold the properties without __typename
    const newObj = {};

    // Iterate through the keys of the input object
    for (const key in obj) {
      // Check if the property is not __typename
      if (key !== '__typename') {
        // Recursively call the function for nested objects
        newObj[key] = removeTypename(obj[key]);
      }
    }

    return newObj;
  }

  // Return non-objects as is
  return obj;
}

const RenderResult = ({ dbag, whip, walletConnected }) => {
  const [mfer, setMfer] = useState();
  const [auto, setAuto] = useState();
  const [addMint, { error, data }] = useMutation(MINT);
  const [submitMint, { errorSubmit, dataSubmit }] = useMutation(SUBMIT_MINT);

  const canvas = useRef(null);


  useEffect(async () => {
    if (canvas.current) {
      if (dbag && whip) {
        // build the mfer + whip
        const constructMfer = new ConstructMfer()
        constructMfer.generateDbagImage(canvas, dbag, whip)
      }
      else {
        const context = canvas.current.getContext('2d');
        // Set the canvas background color to brown
        context.fillStyle = 'rgba(202,195,172,1)';
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
      }
    }
  }, [dbag, whip]);

  // updates the dbag and whip assets
  useEffect(() => {
    setMfer(dbag);
    setAuto(whip);
  }, [dbag, whip]);


  const processMintRequest = async () => {

    // instantiate serialization lib that helps decode blockchain data
    const S = await Cardano();
    // initialize nami wallet helper class
    nami = new NamiWalletApi(
      S,
      window.cardano,
      blockfrostApiKey,
      walletConnected
    );
    // get hashed metadata
    // reconstruct mfer without typename from graphql
    const dbag = removeTypename(mfer);
    const whip = removeTypename(auto)
    // mint selected assets
    let hashedMeta = null;
    let metadata = null;

    try {
      const { data } = await addMint({
        variables: {
          dbagInput: dbag,
          autoInput: whip,
          address: await nami.getAddress()
        },
      });
      // extract hashed metadata
      hashedMeta = data.mint.hashedMeta;
      metadata = JSON.parse(data.mint.metadata);
    }
    // return normally
    catch (e) {
      console.log(e)
      console.log("issue with mint")
      return
    }
    // extract asset name 
    const assetName = Object.keys(metadata["721"]["91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1"])[0];
    // extract payment address
    let paymentAddress = await nami.getAddress(); // nami wallet address

    // ********************************************
    // Build Transaction
    // ********************************************
    
    // build recipients
    let recipients = [
      // Seller Wallet, NFT price 10ADA
      {
        address:
          "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6",
        amount: "10",
      }, 
       // NFTs to be minted to
      {
        address: paymentAddress,
        amount: "0",
        mintedAssets: [
          {
            assetName: assetName,
            quantity: "1",
            policyId:
              "91d319c0fc8c557244d2ac5c2d1c0cbeaeb40a13804f122a51705da1",
            policyScript:
              "8201828200581c98d6a076c31a9d248ec8fe5459682f2ec2623cf376ad0c1c5a61237b82051a02d518fb",
          },
        ],
      },
    ]; 
    
    // build transaction 
    try {
      // combine and build transaction
      const transaction = await nami.transaction({
        PaymentAddress: paymentAddress,
        recipients: recipients,
        metadata: metadata,
        metadataHash: hashedMeta,
        addMetadata: false,
        utxosRaw: await nami.getUtxosHex(),
        multiSig: true,
      });
      // prompting user for signature
      const witnessBuyer = await nami.signTx(transaction, true);
      // submit metadata to the backend 
      const { data } = await submitMint({
        variables: {
          transaction: transaction,
          witnessSignature: witnessBuyer,
          metadata: JSON.stringify(metadata)
        },
      });
      console.log(data)
    }
    // do not proceed if issues occur and update database state
    catch (e) {
      // update database
      console.log("not signed, or error occured")
      console.log(e)
      return
    }
    
  };

  return (
    <>
      <div className="flex flex-col w-2/4">
        <div className='flex flex-col h-5/6 mt-11  justify-center rounded-lg'>
          <canvas className='rounded-lg' ref={canvas} width={1500} height={500} />
          <div className='m-2'>
            {!mfer && <h1>* select your mfer</h1>}
            {!auto && <h1>* select your whip</h1>}
          </div>

        </div>
        {mfer && auto &&
          <div className='mt-4'>
            <button type="submit"
              className="mx-1 text-white bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-lg px-4 py-2"
              onClick={processMintRequest}
            >
              mint
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default RenderResult;
