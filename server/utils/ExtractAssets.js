
const dotenv = require('dotenv');
dotenv.config();



const networkID = 0; // preprod
let blockfrostApiKey = {
    0: process.env.BLOCKFROST_PREPROD, // testnet
}
// hide api keys
let headers = {
    "project_id": blockfrostApiKey[networkID],
};
class ExtractAssets {
    constructor(walletAddress, dbagPolicyID, whipPolicyID) {
        // save as member variables
        this.mWalletAddress = walletAddress
        this.mDbagPolicyID = dbagPolicyID
        this.mWhipPolicyID = whipPolicyID

    }
    // ********************************************
    // get assets within their policy ids
    // ********************************************

    getAssets = async () => {
        // retrieve stake address to poll wallets assets
        const stakeAddress = await this.getStakeAddress()
        // extract dbag and whip assets
        const dbagAssets = await this.pollAssets(stakeAddress, this.mDbagPolicyID)
        const whipAssets = await this.pollAssets(stakeAddress, this.mWhipPolicyID)

        return {
            'dbags' : dbagAssets,
            'whips' : whipAssets
        }


    }

    getAssetsPagination = async (page, stakeAddress) => {

        const assetsEndpoint = `https://cardano-preprod.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets?page=${page}`
        const response = await fetch(assetsEndpoint, {
            headers,
        })
        const data = await response.json()

        return data
    }

    pollAssets = async (stakeAddress, policyID) => {
        // local variables for control
        let assets = []
        let iteratedAllAssets = false
        let pageCnt = 0
        // loop until we have reached end of page
        while (!iteratedAllAssets) {
            pageCnt += 1;
            const assetsUnit = await this.getAssetsPagination(pageCnt, stakeAddress)
            // iterate through each asset and figure out policy id
            for (let i = 0; i < assetsUnit.length; i++) {
                const unit = assetsUnit[i].unit
                // ensure policy exists in unit string
                if (unit.includes(policyID)) {
                    // extract asset
                    const assetHex = unit.split(policyID)[1]
                    const assetName = this.hex_to_ascii(assetHex)
                    // append to array
                    assets.push(assetName)
                }
            }

            // break loop if we hit end of pagination
            iteratedAllAssets = assetsUnit.length < 100 ? true : false;
        }
        return assets

    }

    getStakeAddress = async () => {

        const addressEndpoint = `https://cardano-preprod.blockfrost.io/api/v0/addresses/${this.mWalletAddress}`

        let response = await fetch(addressEndpoint, {
            headers,
        })

        let data = await response.json()
        // get stake address
        return data.stake_address

    }

    hex_to_ascii = (str1) => {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }

}

// export Nami class
module.exports = ExtractAssets;