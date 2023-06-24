const fetch = require("node-fetch");

// global variables to test with 
// const address = "addr1q87yt2za4kffkdhsfzdu7vdvneqmq88g2lhz05fws8n6dz0u3jv9a6thqhl78emaank57ysk63yrg0wnrnu65su9uplsd6ahr0"
// good test
const address = "addr1q87zlevtssntccuu5afvg0j8hpdyes7k5w9k3lg7eu6jxsd46zeke4dvex433xpgufpz3q8tvh2vhcr6hnel8673khfsnzpy2f"

const dbagsPolicyId = "320eb1b7e2f7127be233d43ff051abfb83684d7bcecb381aa10c238a"

// hide api keys
let headers = {
    "project_id": 'mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ',
};

// extracts stake address from base64 recieving address
const extractStakeAddress = async (address) => {
    const addressEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`
    
    let response = await fetch(addressEndpoint, {
        headers,
    })
    
    let data = await response.json()
    // get stake address
    return data.stake_address
}


// read in assets unit value from a page
const getAssetsPagination = async (page, stakeAddress) => {

    const assetsEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets?page=${page}`
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
    console.log("polling assets")
    let assets = []
    // iterate through all assets until size read back is < 100 (max per page)
    let iteratedAllAssets = false
    // debug
    let pageCnt = 0
    while (!iteratedAllAssets)
    {
        console.log(`polling assets in page: ${pageCnt}`)
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
                assets.push(assetsUnit[i])
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

    return assets

}
// main function 
const main = async () => {
    // getting all assets
    const dbagAssets = await getAssets(address, dbagsPolicyId);
    // printing first asset as an example
    console.log(dbagAssets[1])
    console.log(`total dbags collected: ${dbagAssets.length}`)
}


main()