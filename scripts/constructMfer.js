const ConstructMfer =  require('../client/src/utils/ConstructMfer');
// const fetch = require('fetch')

const mferSelected = "dbagMfer6250"
const autoSelected = "446261674d666572734175746f436c75623131323136"
// list of assets in wallet
const mfers = [
    "dbagMfer1",
    "dbagMfer2",
    "dbagMfer3933",
    "dbagMfer2903",
    "dbagMfer1284",
    "dbagMfer2736",
    "dbagMfer6250",
    "dbagMfer2700"
]
const whips = [
    '446261674d666572734175746f436c75623039363537',
    '446261674d666572734175746f436c75623031333637',
    '446261674d666572734175746f436c75623132333836',
    '446261674d666572734175746f436c75623130363838',
    '446261674d666572734175746f436c75623035323935',
    '446261674d666572734175746f436c75623133383535',
    '446261674d666572734175746f436c75623032303030',
    '446261674d666572734175746f436c75623031313739',
    '446261674d666572734175746f436c75623034323736',
    '446261674d666572734175746f436c75623131393739',
    '446261674d666572734175746f436c75623038313237',
    '446261674d666572734175746f436c75623036313232',
    '446261674d666572734175746f436c75623132313537',
    '446261674d666572734175746f436c75623030303137',
    '446261674d666572734175746f436c75623036343236',
    '446261674d666572734175746f436c75623132373830',
    '446261674d666572734175746f436c75623036393438',
    '446261674d666572734175746f436c75623131343639',
    '446261674d666572734175746f436c75623032373131',
    '446261674d666572734175746f436c75623131313834',
    '446261674d666572734175746f436c75623030383032',
    '446261674d666572734175746f436c75623037313539',
    '446261674d666572734175746f436c75623131323136',
    '446261674d666572734175746f436c75623032323238',
    '446261674d666572734175746f436c75623034313039',
    '446261674d666572734175746f436c75623131373934',
    '446261674d666572734175746f436c75623030363234',
    '446261674d666572734175746f436c75623032343536',
    '446261674d666572734175746f436c75623131363832',
    '446261674d666572734175746f436c75623130333233',
    '446261674d666572734175746f436c75623037303030',
    '446261674d666572734175746f436c75623037393530',
    '446261674d666572734175746f436c75623035383439',
    '446261674d666572734175746f436c75623036353334',
    '446261674d666572734175746f436c75623035383330',
    '446261674d666572734175746f436c75623031363136',
    '446261674d666572734175746f436c75623037333038',
    '446261674d666572734175746f436c75623132393531',
    '446261674d666572734175746f436c75623030383730',
    '446261674d666572734175746f436c75623032363835',
    '446261674d666572734175746f436c75623034323835',
    '446261674d666572734175746f436c75623130323839',
    '446261674d666572734175746f436c75623033333637',
    '446261674d666572734175746f436c75623131323739',
    '446261674d666572734175746f436c75623039353130',
    '446261674d666572734175746f436c75623038333532',
    '446261674d666572734175746f436c75623033353232',
    '446261674d666572734175746f436c75623131393536',
    '446261674d666572734175746f436c75623035363731',
    '446261674d666572734175746f436c75623131393530',
    '446261674d666572734175746f436c75623036383539',
    '446261674d666572734175746f436c75623039363736',
    '446261674d666572734175746f436c75623131393935',
    '446261674d666572734175746f436c75623132393736',
    '446261674d666572734175746f436c75623037313238',
    '446261674d666572734175746f436c75623035373231',
    '446261674d666572734175746f436c75623033383037',
    '446261674d666572734175746f436c75623031323936'
]
// console.log(`amount of whips = ${whips.length}`)
// const get
const main = async () => {
    const headers = {
        'Content-Type': 'application/json', 
    };
    const endpoint = 'http://localhost:3001/api/projectData/getSelectedMetaData'
    // get data sets
    const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
            "dbagAssets": mfers,
            "autoAssets": whips
        })
    })

    // metadata for all 
    const metadata = await response.json()
    // generate image
    const constructMfer = new ConstructMfer(metadata, mfers, whips)
    // generate an image with the mfer that was selected and the auto selected as well
    for (let i = 0; i < 1; i++){
        const img = await constructMfer.generateImage(mferSelected,whips[i])
        img.writeAsync(`./imgs/${i+1}.png`)
    }

}

main()
