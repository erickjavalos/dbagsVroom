const main = async () => {
    const headers = {
        'Content-Type': 'application/json', 
    };
    const endpoint = 'http://localhost:3001/api/projectData/getMetaData'
    // get data sets
    const response = await fetch(endpoint, {
        headers
    })

    // metadata for all 
    const metadata = await response.json()
    const autos = metadata.autoAssets
    const mfers = metadata.dbagAssets

    let pass = 0;
    autos.forEach((auto) => {
        if (auto.onchain_metadata.image.includes("ipfs://"))
        {
            pass += 1
        }
    })

    mfers.forEach((mfer) => {
        if (mfer.onchain_metadata.image.includes("ipfs://"))
        {
            pass += 1
        }
    })

    if (pass === autos.length + mfers.length)
    {
        console.log("TEST PASSED")
    }
    else {
        console.log("TEST FAILED")
    }

}

main()
