const fs = require('fs');

// tests the auto and mfer layers i generated
const dbagLayers = require('./data/dbagLayers.json');
const autoSeeds = require('./data/autoLayers.json');

let failFlag = false;


const iterateCheck = async (layer, layerName, project) => {
    
    for (let i = 0; i < layer.length; i++)
    {
        if (layer[i] === "Captain's hat")
        {
            fs.readFile(`../client/src/assets/${project}/${layerName}/Captain_s hat.png`, 'utf8', (err, data) => {

                
                if (err) {
                console.log(layer[i])
                  console.error(err);
                  failFlag = true
                  return;
                }
              });
        }
        else if (layer[i] !== "" && layer[i] !== null){
            fs.readFile(`../client/src/assets/${project}/${layerName}/${layer[i]}.png`, 'utf8', (err, data) => {

                // console.log(layer[i])
                if (err) {
                console.log(layer[i])
                    failFlag = true
                  console.error(err);
                  return;
                }
                // console.log(data);
              });
        }
    }
}
// iterate through all dbag layers
iterateCheck(dbagLayers.eyes, "Eyes", "mfers_assets")
iterateCheck(dbagLayers.mouth, "Mouth", "mfers_assets")
iterateCheck(dbagLayers.clothes, "Clothes", "mfers_assets")
iterateCheck(dbagLayers.special, "Special", "mfers_assets")
iterateCheck(dbagLayers.bodyType, "BodyType", "mfers_assets")
iterateCheck(dbagLayers.headItems, "HeadItems", "mfers_assets")
iterateCheck(dbagLayers.background, "Background", "mfers_assets")
iterateCheck(dbagLayers.headPhones, "HeadPhones", "mfers_assets")
iterateCheck(dbagLayers.mouthItems, "MouthItems", "mfers_assets")

// iterate through all auto layers
iterateCheck(autoSeeds.background, "Background", "auto_assets")
iterateCheck(autoSeeds.car, "Car", "auto_assets")
iterateCheck(autoSeeds.exhaustFumes, "Exhaust Fumes", "auto_assets")



console.log(failFlag? "ERRORS": "ALL TESTS PASSED!!")