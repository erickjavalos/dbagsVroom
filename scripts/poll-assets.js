
// get assets
const getAssets = async () => {
    dbagsPolicyId = "320eb1b7e2f7127be233d43ff051abfb83684d7bcecb381aa10c238a"
    let headers = {
        "project_id": 'mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ',
    };
    const address = "addr1qyg3278vaa92lftpf5x3l30lsyjzedvzjpdr3aetnvjvfe0u3jv9a6thqhl78emaank57ysk63yrg0wnrnu65su9uplsdgasyx"
    const addressEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`

    let response = await fetch(addressEndpoint, {
        headers,
    })
    
    let data = await response.json()
    // get stake address
    const stakeAddress = data.stake_address

    // get assets 
    const assetsEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets`
    response = await fetch(addressEndpoint, {
        headers,
    })
    data = await response.json()
    const assets = data.amount
    // console.log(data.amount)

    for (let i = 1; i < assets.length; i++) {
        const asset = assets[i]
        const assetEndpoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset.unit}`
        response = await fetch(assetEndpoint, {
            headers,
        })
        
        data = await response.json()
        console.log(data.policy_id)
        // if (data.policy_id === dbagsPolicyId) {

            // console.log(data)
        // }
    }

}

getAssets()