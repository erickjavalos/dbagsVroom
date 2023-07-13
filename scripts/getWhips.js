const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '../client/src/assets/auto_assets/Car');
//passsing directoryPath and callback function

// for requests sent to backend
const headers = {
    'Content-Type': 'application/json', 
};

fs.readdir(directoryPath, function (err, files) {
    //handling error
    let cars = []
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        // console.log(file);
        cars.push(file.split(".png")[0]) 
    })


    const process = async () => {

        const response = await fetch('http://localhost:3001/api/projectData/getMetaData', headers)
        const metadata = await response.json()
        // get meta data from autos
        const autoMeta = metadata.autoAssets
        const assets = []

        console.log(cars.length)
        cars.forEach((car) => {
            try {
                autoMeta.forEach((data) => {
                    // console.log(data)
                    if (car === data.onchain_metadata.Car)
                    {
                        assets.push(data.asset_name)
                        throw new Error("Break the loop.")
                    }
                })
            }
            catch (err)
            {
                //continue mfer
            }

        })
        
        console.log(assets)
        console.log(`number of assets in folder ${assets.length}`)
    };

    process()

    // get all the metadata for cars 

})