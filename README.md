# DbagsVroom

This project allowed an NFT project in the Cardano ecosystem combine two assets from different policyIDs into a unique NFT. Utilizing the dbagMfers collection and their respected Dbag Mfer Auto Club we were able to allow owners select a dbagMfer NFT and a Auto Club NFT which then combines into a unique NFT. Users are able to purchase and mint that custom NFT into their crypto wallet. 

The authentication to this system uses Discords OAuth2 API where users must be a part of the Discord server pertaining to the Dbag project. Upon valid authentication, a JWT token is generated in the backend thats used for authentication. 


# Technologies Used
- TypeScript
- React
- Lucid-Cardano
- Discord OAuth2.0 Integration
- Node
- Express
- Blockfrost

# Running the files 
1. ``` npm install ```
2. Fill in .env in server/.env
        
        BLOCKFROST_PREPROD=
        DBAGS_GUILD_ID=
        CLIENT_ID =
        CLIENT_SECRET =
        # NODE_ENV=production
        PINATA_API_KEY=
        PINATA_API_SECRET=
        PINATA_JWT=
        POLICY_ID=
        POLICY_SIGNING_CBOR=
        REDIRECT_URI =
        SECRET=
        WALLET_PRIVATE_KEY=

3. ``` npm run develop ```

# Demo

https://github.com/user-attachments/assets/2552b342-edd7-4b97-8628-d69f5843fddd






