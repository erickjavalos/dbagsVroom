const { db } = require('../config/connection');
// models
const { AutosMint } = require('../models');
const { DbagsMint } = require('../models');
// seed data
const autoSeeds = require('./autoSeeds.json');
const dbagSeeds = require('./dbagSeeds.json');


const loadData = async (model, data, str) => {
  // load dbags into db
  let cnt = 0

  // iterate through each seed and manually create it for each model
  for (let i = 0; i < data.length; i++)
  {
    try{
      await model.create({...data[i], minted: "FALSE"})

      cnt += 1
    }
    catch(err){
    }
  }

  console.log(`loaded ${cnt} ${str}...`)
  
}

const loadMint = async (model, data, str) => {
  // load dbags into db
  let cnt = 0

  // iterate through each seed and manually create it for each model
  for (let i = 0; i < data.length; i++)
  {
    try{
      // await model.create(data[i])
      const dbEntry = {
        name: data[i].onchain_metadata.name,
        state: "AVAILABLE"
      }
      await model.create(dbEntry)

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
    await DbagsMint.deleteMany({});
    await AutosMint.deleteMany({})
    

    // load dbags and auto
    // await Dbags.create(dbagSeeds)
    await loadData(DbagsMint,dbagSeeds, "dbags")
    await loadData(AutosMint,autoSeeds, "autos")

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('ALL DONE MFER!');
  process.exit(0);
});
