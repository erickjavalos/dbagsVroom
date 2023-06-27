const ConstructMfer =  require('../client/src/utils/ConstructMfer');

const mferSelected = "dbagMfer3933"
const autoSelected = "446261674d666572734175746f436c75623037303030"
// list of assets in wallet
const mfers = [
    "dbagMfer1",
    "dbagMfer2",
    "dbagMfer3933",
    "dbagMfer2903",
    "dbagMfer1284",
    "dbagMfer2736",
    "dbagMfer2285"
]
const whips = [
    
]
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
    const img = await constructMfer.generateImage(mferSelected,autoSelected)
    img.writeAsync('./imgs/auto.png')

}

main()
