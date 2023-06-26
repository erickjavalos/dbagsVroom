const fs = require('fs')
const dbagSeeds = require('../server/seeders/dbagSeeds.json');
const autoSeeds = require('../server/seeders/autoSeeds.json');


const headers = {
    'Content-Type': 'application/json', // Set the appropriate content type
    // Add any other headers required by the API
  };

const writeFile = async (filename, data) => {
    console.log(JSON.stringify(data))
    fs.writeFile(`./data/${filename}.json`, JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
        console.log(`completed ${filename}s`);
        }
    );
}


const getDbagLayers = async (data) => {
    
    let eyes = []
    let mouth = []
    let clothes = []
    let special = []
    let bodyType = []
    let headItems = []
    let background = []
    let headPhones = []
    let mouthItems = []


    for (let i =0; i< data.length; i++)
    {
        eyes.push(data[i].onchain_metadata.Eyes)
        mouth.push(data[i].onchain_metadata.Mouth)
        clothes.push(data[i].onchain_metadata.Clothes)
        special.push(data[i].onchain_metadata.Special)
        bodyType.push(data[i].onchain_metadata.BodyType)
        headItems.push(data[i].onchain_metadata.HeadItems)
        background.push(data[i].onchain_metadata.Background)
        headPhones.push(data[i].onchain_metadata.HeadPhones)
        mouthItems.push(data[i].onchain_metadata.MouthItems)
    }

    const layers = {
        "eyes": [... new Set(eyes)],
        "mouth": [... new Set(mouth)],
        "clothes": [... new Set(clothes)],
        "special": [... new Set(special)],
        "bodyType": [... new Set(bodyType)],
        "headItems": [... new Set(headItems)],
        "background": [... new Set(background)],
        "headPhones": [... new Set(headPhones)],
        "mouthItems": [... new Set(mouthItems)]
    }
    return layers
}

const getAutoLayers = async (data) => {
    console.log(data)
    
    let car = []
    let background = []
    let ExhaustFumes = []

    for (let i =0; i< data.length; i++)
    {
        car.push(data[i].onchain_metadata.Car)
        background.push(data[i].onchain_metadata.Background)
        ExhaustFumes.push(data[i].onchain_metadata.ExhaustFumes)
    }


    const layers = {
        "car": [... new Set(car)],
        "background": [... new Set(background)],
        "exhaustFumes": [... new Set(ExhaustFumes)]
    }
    return layers
}



const main = async () => 
{
    const endpoint = 'http://localhost:3001/api/projectData/getMetaData'
    // get data sets
    const response = await fetch(endpoint, {
        headers,
    })
    
    const metadata = await response.json()
    const dbags = metadata.dbagAssets
    const autos = metadata.autoAssets

    let dbagLayers = await getDbagLayers(dbags)
    let autoLayers = await getAutoLayers(autos)

    await writeFile("dbagLayers", dbagLayers)
    await writeFile("autoLayers", autoLayers)
}

main()


