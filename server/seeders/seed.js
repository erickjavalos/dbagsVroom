const db = require('../config/connection');
const { Dbags } = require('../models');
const { Autos } = require('../models');
const dbagSeeds = require('./dbagSeeds.json');
const autoSeeds = require('./autoSeeds.json');


const loadData = async (model, data, str) => {
  // load dbags into db
  let cnt = 0
  for (let i = 0; i < data.length; i++)
  {
    try{
      const name = data[i].onchain_metadata.name
      const ipfs = data[i].onchain_metadata.image
      // console.log(name)
      await model.create({
        assetName: name,
        ipfs: ipfs
      })

      cnt += 1
    }
    catch(err){
    }
  }
  console.log(`loaded ${cnt} ${str}...`)

}

db.once('open', async () => {
  try {
    // delete dbags and auto entries from db
    await Dbags.deleteMany({});
    await Autos.deleteMany({})

    // load dbags and autos
    await loadData(Dbags,dbagSeeds, "dbags")
    await loadData(Autos,autoSeeds, "autos")
    
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
