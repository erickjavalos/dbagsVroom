const { db } = require('../config/connection');
// models
const { Wallets } = require('../models');
// seed data
const wallets = require('./walletSeeds.json');


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
    await Wallets.deleteMany({});
    // await Wallets.create(wallets)
    const result = await Wallets.findOneAndUpdate({stakeAddress: "stake1uxshf7c6ccysp8ze44g064pg5qqm5a65nrck5gspvlu6fesf6q3ga"}, 
    {dbagAssets: [ 'dbagMfer1' ]}, {
      new: true, // Return the updated document
      upsert: true, // Create a new document if it doesn't exist
    });
    console.log(result)

    // // load dbags and auto
    // // await Dbags.create(dbagSeeds)
    // await loadData(Dbags,dbagSeeds, "dbags")
    // await loadData(Autos,autoSeeds, "autos")
    // await loadMint(Mint,autoSeeds, "mint")

    // // await Profile.create(profileSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('ALL DONE MFER!');
  process.exit(0);
});
