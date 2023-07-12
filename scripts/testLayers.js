const fs = require('fs');
var path = require('path');

// tests the auto and mfer layers i generated
const dbagLayers = require('./data/dbagLayers.json');
const autoSeeds = require('./data/autoLayers.json');

let failFlag = false;



function fileExistsWithCaseSync(filepath) {
  var dir = path.dirname(filepath);
  if (dir === '/' || dir === '.') return true;
  var filenames = fs.readdirSync(dir);
  if (filenames.indexOf(path.basename(filepath)) === -1) {
    return false;
  }
  return fileExistsWithCaseSync(dir);
}


const iterateCheck = async (layer, layerName, project) => {
  // console.log(layer)
  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === "Captain's hat") {

      const checkCase = fileExistsWithCaseSync(`../client/src/assets/${project}/${layerName}/Captain_s hat.png`)
      if (!checkCase) {
        console.log(`Error on layer (${layerName}), ${layer[i]}`)
      }
      // fs.readFile(`../client/src/assets/${project}/${layerName}/Captain_s hat.png`, 'utf8', (err, data) => {


      //   if (err) {
      //     console.log(layer[i])
      //     console.error(err);
      //     failFlag = true
      //     return;
      //   }
      // });
    }
    else if (layer[i] !== "" && layer[i] !== null) {
      const checkCase = fileExistsWithCaseSync(`../client/src/assets/${project}/${layerName}/${layer[i]}.png`)
      if (!checkCase) {
        console.log(`Error on layer (${layerName}), ${layer[i]}`)
      }
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
iterateCheck(autoSeeds.exhaustFumes, "ExhaustFumes", "auto_assets")



console.log(failFlag ? "ERRORS" : "ALL TESTS PASSED!!")