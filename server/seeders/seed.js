const db = require('../config/connection');
const { Dbags } = require('../models');
const { Autos } = require('../models');
const dbagSeeds = require('./dbagSeeds.json');
const autoSeeds = require('./autoSeeds.json');



const loadData = async (model, data, str) => {
  // load dbags into db
  let cnt = 0

  // iterate through each seed and manually create it for each model
  for (let i = 0; i < data.length; i++)
  {
    try{
      await model.create(data[i])

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

    

    // load dbags and auto
    // await Dbags.create(dbagSeeds)
    await loadData(Dbags,dbagSeeds, "dbags")
    await loadData(Autos,autoSeeds, "autos")
    
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('ALL DONE MFER!');
  process.exit(0);
});
