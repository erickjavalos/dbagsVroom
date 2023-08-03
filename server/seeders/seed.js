const { db } = require('../config/connection');
// models
const { Autos } = require('../models');
const { Dbags } = require('../models');
const { Profile } = require('../models');
// seed data
const autoSeeds = require('./autoSeeds.json');
const dbagSeeds = require('./dbagSeeds.json');
const profileSeeds = require('./profileSeeds.json');





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
    await Profile.deleteMany({});
    

    // load dbags and auto
    // await Dbags.create(dbagSeeds)
    await loadData(Dbags,dbagSeeds, "dbags")
    await loadData(Autos,autoSeeds, "autos")
    await Profile.create(profileSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('ALL DONE MFER!');
  process.exit(0);
});
