import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';

import ConstructMfer from '../../utils/ConstructMfer';

import NamiWalletApi, { Cardano } from "../../nami-js";
import blockfrostApiKey from "../../../config.js";

import {MINT} from "../../utils/mutations"
let nami;



const RenderResult = ({ dbag, whip, walletConnected }) => {
    const [mfer, setMfer] = useState();
    const [auto, setAuto] = useState();
    const [mint, { error, data }] = useMutation(MINT);

    const canvas = useRef(null);
    

    useEffect(async () => {
        if (canvas.current) {
            if (dbag && whip) {
                // build the mfer + whip
                const constructMfer = new ConstructMfer()
                constructMfer.generateDbagImage(canvas,dbag, whip)
                
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
        // get hashed metadata
        // console.log("gettin address");
        console.log("assets selected")
        console.log(mfer, auto)

        // test
        // instantiate serialization lib that helps decode blockchain data
        const S = await Cardano();
        // initialize nami wallet helper class
        nami = new NamiWalletApi(
          S,
          window.cardano,
          blockfrostApiKey,
          walletConnected
        );
    
        // // GET hashed metadata
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
