// ********************************************************
// Description:
//
// Generates a new minting policy and prints the policy 
// script.
//
// ********************************************************
// Developer: Erick Avalos
//
// ********************************************************

import { Blockfrost,Lucid } from "lucid-cardano";
import dotenv from 'dotenv'
dotenv.config()

const lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", process.env.PREPOD_API_KEY),
    "Preprod",
  );

lucid.selectWalletFromPrivateKey(process.env.PRIVATE_KEY);

const { paymentCredential } = lucid.utils.getAddressDetails(
    await lucid.wallet.address(),
  );
  
const mintingPolicy = lucid.utils.nativeScriptFromJson(
    {
        type: "all",
        scripts: [
        { type: "sig", keyHash: paymentCredential.hash },
        {
            type: "before",
            slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
        },
        ],
    },
);
console.log(mintingPolicy)