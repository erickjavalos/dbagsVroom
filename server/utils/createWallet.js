// ********************************************************
// Description:
//
// Generates a new wallet and prints the private key.
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
  
const privateKey = lucid.utils.generatePrivateKey(); // Bech32 encoded private key
console.log(privateKey)