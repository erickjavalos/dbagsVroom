const fetch = require("node-fetch");

// global variables to test with 
// const address = "addr1q87yt2za4kffkdhsfzdu7vdvneqmq88g2lhz05fws8n6dz0u3jv9a6thqhl78emaank57ysk63yrg0wnrnu65su9uplsd6ahr0"
// good test
const address = "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6"
// policy id on testnet
const dbagsPolicyId = "a89d6c96713c57190c98cae3d26a85e1528bc9ec22fb85d5e21e0ab7"

// hide api keys
let headers = {
    "project_id": 'preprodEfV6mA9d1Mkavc5XRYmFGsPdqAfj1HGx',
};

// convert hex to string
function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
// extracts stake address from base64 recieving address
const extractStakeAddress = async (address) => {
    const addressEndpoint = `https://cardano-preprod.blockfrost.io/api/v0/addresses/${address}`
    
    let response = await fetch(addressEndpoint, {
        headers,
    })
    
    let data = await response.json()
    // get stake address
    return data.stake_address
}


// read in assets unit value from a page
const getAssetsPagination = async (page, stakeAddress) => {

    const assetsEndpoint = `https://cardano-preprod.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets?page=${page}`
    response = await fetch(assetsEndpoint, {
        headers,
    })
    data = await response.json()
    
    return data
}

// get asset information from unit 
const getAssetInformation = async (unit) => {
    const assetEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${unit}`
    response = await fetch(assetEndpoint, {
        headers,
    })
        
    data = await response.json()
    return data
}


// iterate and get all assets 
const getAllAssetUnits = async (stakeAddress,projectPolicyID) => {
    let assets = []
    // iterate through all assets until size read back is < 100 (max per page)
    let iteratedAllAssets = false
    // debug
    let pageCnt = 0
    while (!iteratedAllAssets)
    {
        pageCnt += 1;
        const assetsUnit = await getAssetsPagination(pageCnt,stakeAddress)
        // iterate through each asset and figure out policy id
        for (let i = 0; i < assetsUnit.length; i++) {
            const unit = assetsUnit[i].unit
            const policyID = unit.substring(0,56)
            // verify policyid exists and poll for information based on unit
            if (policyID === projectPolicyID)
            {
                // get full asset details and append to array
                // const assetDetails = await getAssetInformation(assetsUnit[i].unit)
                assets.push(hex_to_ascii(assetsUnit[i].unit.split(policyID)[1]))
            }
        }

        // break loop if we hit end of pagination
        iteratedAllAssets = assetsUnit.length < 100 ? true: false;
        // iteratedAllAssets = true
    }
    return assets

}
// get all policy id assets within an address
const getAssets = async (address, policyID) => {
    // find all the assets
    // extract stakeAddress
    const stakeAddress = await extractStakeAddress(address)
    // return all assets with metadata
    const assets = await getAllAssetUnits(stakeAddress, policyID)
    // split assets based on policy id
    // console.log
    // console.log(assets)
    return assets
    // return []

}
// main function 
const main = async () => {
    // getting all assets
    const dbagAssets = await getAssets(address, dbagsPolicyId);
    // printing first asset as an example
    console.log(dbagAssets)
    console.log(`total dbags collected: ${dbagAssets.length}`)
}


main()