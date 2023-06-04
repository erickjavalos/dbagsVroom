# Simple Minting Machine

The intent of this repository is to set up a barebones multi signature system that mints assets. The system will be able to take an mint request
from the user where they will be prompted a transaction that is built on the backend for them to sign. The transaction will hold contents of 
the asset they will be minting along with the amount they have to pay. Upon confirmation that the user signs the contract to receive an NFT 
for an X amount of ADA. 

# Technologies Used
- TypeScript
- React
- Lucid-Cardano
- Node
- Express
- Blockfrost


# TODOs

Front-End 

    * [x] integrate button on front end that instantiates a mint 
    * [x] Button needs to submit an api to its local proxy localhost:30001 and hit the /api/mint/ get request endpoint
    * Get Request returns a hashed metadata of the contents the user will mint (can also build the transaction in the backend since we dont have
      to hide the nft asset like standard vending machine mints)
    * If status is 200 build transaction of the nft, the amount of ada they plan to pay on the front end (safer if i build this in the backend)
    * Prompt user to sign transaction via nami wallet smart contract
    * Submit signed transaction to /api/mint/submitTransaction endpoint

Back-End
    * redirect discord to a route that only the backend can instantiate
        * ensure auth token is saved to a db with a respected user and update token property (could be useful later)
    * /api/mint endpoint
        * build hashed metadata and respond to request with data
        * can possibly build the full transaction here and submit just that (look into)
    * /api/submit-transaction
        * attach my signature + signature from front end to witnesses
        * attach witness to transaction to submit to blockchain
        * verify txhash and return a confirmation that the user minted the asset
    