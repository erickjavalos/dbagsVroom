
var fs = require('fs');
let date_ob = new Date();
const fetch = require("node-fetch");


function getTime() {
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

}

function ascii_to_hexa(str)
{
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) 
    {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}


const writeFile = async (filename, data) => {
    fs.writeFile(`./data/${filename}.json`, JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
        console.log(`completed ${filename}s`);
        }
    );
}

getDBAGData = async (policyID) => {
    
    // iterate through 6969 unique assets to get 6969 addresses
    let data = []
    for (let i = 1; i <= 6969; i++)
    {  
        console.log(`Getting address for dbagMfer${i}`)
        const assetId = policyID + ascii_to_hexa(`dbagMfer${i}`)
        const endpoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${assetId}`;

        let headers = {
            "project_id": "mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ",
        };


        try{
            const response = await fetch(endpoint, {
                headers,
            })
            
            const dataJson = await response.json()
            // console.log(dataJson)
            data.push(dataJson)
            
           
        }
        catch(err){
            console.log(err)
        }
        

    }    

    writeFile("dbagMetaData", data)

}

getAutoClubData = async (policyID) => {
    
    // iterate through 6969 unique assets to get 6969 addresses
    let data = []
    let iteratedAllAssets = false
    // debug
    let pageCnt = 0
    while (!iteratedAllAssets)
    {
        console.log(`polling assets in page: ${pageCnt}`)
        pageCnt += 1;

        const endpoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/${policyID}?page=${pageCnt}`;
        let headers = {
            "project_id": "mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ",
        };
        let unitValues = 100
        try{
            const response = await fetch(endpoint, {
                headers,
            })
            
            unitValues = await response.json()
            // iterate through each unit value
            for (let i = 0; i < unitValues.length; i++)
            {
                console.log(unitValues[i].asset)
                const endpoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${unitValues[i].asset}`;
                let headers = {
                    "project_id": "mainnetDLGWFVceMET9Pok1OwwioXT6iiHpO1iJ",
                };

                try{
                    const response = await fetch(endpoint, {
                        headers,
                    })
                    
                    const dataJson = await response.json()
                    // console.log(dataJson)
                    data.push(dataJson)
                    
                
                }
                catch(err){
                    console.log(err)
                }
            }            
           
        }
        catch(err){
            console.log(err)
        }

        // break loop if we hit end of pagination
        iteratedAllAssets = unitValues.length < 100 ? true: false;
        // iteratedAllAssets = true
    }
    console.log(data)

    writeFile("autoclub", data)

}



// const mfers3dPolicy = "47ac9e633b5385f92ab6c6a2b4f405d45248a728b44bd480f0486fe6"
const dbagsPolicy = "320eb1b7e2f7127be233d43ff051abfb83684d7bcecb381aa10c238a"
const autoClubPolicy = "6e86a2dbd55b8b25d3ae95d2f056e47ab3df5b5f779531953c9bb12f"


// ideally iterate through all policies and save all assets
getDBAGData(dbagsPolicy)
getAutoClubData(autoClubPolicy)
