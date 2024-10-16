import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import ConstructMfer from "../../utils/ConstructMfer";
import NamiWalletApi, { Cardano } from "../../nami-js";
import blockfrostApiKey from "../../../config.js";
import { MINT, SUBMIT_MINT } from "../../utils/mutations";

let nami;

function removeTypename(obj) {
  // Check if the input is an object
  if (typeof obj === "object" && obj !== null) {
    // Create a new object to hold the properties without __typename
    const newObj = {};

    // Iterate through the keys of the input object
    for (const key in obj) {
      // Check if the property is not __typename
      if (key !== "__typename") {
        // Recursively call the function for nested objects
        newObj[key] = removeTypename(obj[key]);
      }
    }

    return newObj;
  }

  // Return non-objects as is
  return obj;
}

const RenderResult = ({ dbag, whip, walletConnected, setMinted }) => {
  const [mfer, setMfer] = useState();
  const [auto, setAuto] = useState();
  const [addMint, { error, data }] = useMutation(MINT);
  const [submitMint, { errorSubmit, dataSubmit }] = useMutation(SUBMIT_MINT);
  const [isMinting, setIsMinting] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);

  const canvas = useRef(null);

  useEffect(async () => {
    if (canvas.current) {
      if (dbag && whip) {
        // build the mfer + whip
        const constructMfer = new ConstructMfer();
        await constructMfer.generateDbagImage(canvas, dbag, whip);
        setIsLoadingAssets(false); // Assets are no longer loading
      } else {
        const context = canvas.current.getContext("2d");
        // Set the canvas background color to brown
        context.fillStyle = "rgba(202,195,172,1)";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        setIsLoadingAssets(false); // Assets are no longer loading
      }
    }
  }, [dbag, whip]);

  // updates the dbag and whip assets
  useEffect(() => {
    setMfer(dbag);
    setAuto(whip);
  }, [dbag, whip]);

  const processMintRequest = async () => {
    setIsMinting(true);

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
    const whip = removeTypename(auto);
    // mint selected assets
    let hashedMeta = null;
    let assetName = null;

    try {
      const { data } = await addMint({
        variables: {
          dbagInput: dbag,
          autoInput: whip,
          address: await nami.getAddress(),
        },
      });
      // extract hashed metadata
      hashedMeta = data.mint.hashedMeta;
      assetName = data.mint.assetName;
      // window.location.reload();
    } 
    // return normally
    catch (e) {
      console.log(e)
      console.log("issue with mint")
      setMinted(false)
      return
    }
    // extract payment address
    let paymentAddress = await nami.getAddress(); // nami wallet address

    // ********************************************
    // Build Transaction
    // ********************************************

    let recipients = [
      {
        address:
          "addr_test1qqyretpvwl6hy9jtcj3l8fru66k2r2ff25tnf4zktyxu0flmk9yfxfh2c4pfes04jwnw9p7htz36erfa6aym4jtpvc8qzvtklj",
        amount: "10",
      }, // Seller Wallet, NFT price 10ADA
      {
        address: paymentAddress,
        amount: "0",
        mintedAssets: [
          {
            assetName: assetName,
            quantity: "1",
            policyId:
              "e34bc1363d03f5e3a4c0a8fb9fbbba34dbe643f1e2c798f2da56eba8",
            policyScript:
              "8201828200581c624d55c0e5d2a1712436b3bb188be1703e33b478dc2da3a31985f7d482051a051538a8",
          },
        ],
      }, // NFTs to be minted
    ]; // list of recipients
    // build fake metadata to help estimate gas fees (use maximum packet size to be safe)
    let dummyMetadata = {
      721: {
        // policyId
        e34bc1363d03f5e3a4c0a8fb9fbbba34dbe643f1e2c798f2da56eba8: {
          // NFTName
          assetName: {
            name: `dbagxauto000000000`, // dynamic
            Dbag: "asdfasdfasdfasdfasdfasdfasdfasdfasd",
            Auto: "asdfasdfasdfasdfasdfasdfasdfasdfasd",
            image:
              "isdgdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfsgdfgdfgdfsgdfsfsgdfsg",
            Collection: "asdfasdfasdfasdfasdfasdfasdfasdf",
            Twitter: "asdfasdfasdfasdfasdfasdfasdfasdfasd",
            Website: "asdfasdfasdfasdfasdfasdfasdfasdfasd",
          },
        },
      },
    };

    // build transaction
    try {
      // combine and build transaction
      const transaction = await nami.transaction({
        PaymentAddress: paymentAddress,
        recipients: recipients,
        metadata: dummyMetadata,
        metadataHash: hashedMeta,
        addMetadata: false,
        utxosRaw: await nami.getUtxosHex(),
        multiSig: true,
      });
      console.log("built transaction")
      // prompting user for signature
      const witnessBuyer = await nami.signTx(transaction, true);
      // submit metadata to the backend
      console.log("signed mint")
      const { data } = await submitMint({
        variables: {
          transaction: transaction,
          witnessSignature: witnessBuyer,
          autoInput: whip,
        },
      });
      console.log("submitted Mint")
      console.log(data)

      setIsMinting(false)
      setMinted(true)
    }
    // do not proceed if issues occur and update database state
    catch (e) {
      // update database
      console.log("not signed, or error occured")
      console.log(e)

      setIsMinting(false)
      setMinted(false)

      return
    }
  };

  return (
    <>
      <div className="flex flex-col w-2/4">
        <div className="flex flex-col h-5/6 mt-11 justify-center rounded-lg">
          {/* canvas for dbag and whip */}
          <canvas className="rounded-lg"
            ref={canvas}
            width={1500}
            height={500}
          />
          <div className='m-2'>
            {!mfer && <h1>* select your mfer</h1>}
            {!auto && <h1>* select your whip</h1>}
          </div>
        </div>
        {mfer && auto && (
          <div className='mt-4'>
            <button type="submit"
              className={`mx-1 text-white ${isMinting && `pointer-events-none`} bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-lg px-4 py-2`}
              onClick={processMintRequest}
              disabled={isMinting}
            >
              {/* mint spinner */}
              {isMinting ? (
                <div className="flex items-center">
                  <div className="spinner border-t-4 border-gray-500 border-solid rounded-full h-4 w-4 animate-spin mr-2"></div>
                  Minting...
                </div>
              ) : (
                'mint'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RenderResult;
