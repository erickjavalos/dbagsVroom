import NamiWalletApi, { Cardano } from "../nami-js";
import blockfrostApiKey from "../../config.js";


class ProcessMint {
    constructor(S,cardano,wallet) {
        // initialize the wallet class to interface with

        
        this.walletApi = new NamiWalletApi(
            S,
            cardano,
            blockfrostApiKey,
            wallet
          );
    }

    getHashMeta = async() => {
        // instantiate the mint process
        const mint = await fetch("/api/mint/", {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
        // return data
        return await mint.json();
    }

    buildTransaction = async (hashedMeta) => {

        let paymentAddress = await this.walletApi.getAddress(); // nami wallet address
        // 
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
        // dummy meta data
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
        console.log(paymentAddress)
        console.log(hashedMeta)
        console.log(await this.walletApi.getUtxosHex())
        console.log(dummyMetadata)
        // combine and build transaction
        let transaction = await this.walletApi.transaction({
            PaymentAddress: paymentAddress,
            recipients: recipients,
            metadata: dummyMetadata,
            metadataHash: hashedMeta,
            addMetadata: false,
            utxosRaw: await this.walletApi.getUtxosHex(),
            multiSig: true,
        });
        console.log("SUCCESS: transaction built!");
        return transaction
    }

}

export default ProcessMint;
