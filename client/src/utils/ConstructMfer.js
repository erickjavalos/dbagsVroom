const Jimp = require('jimp');
const Orientation = require("../data/OrientationConstants.json")

// console.log(Orientation)


class ConstructMfer {
    constructor(metadata, mfers, whips) {
        // initialize the mfers and dbags in the wallet
        this.mfers = mfers
        this.whips = whips
        this.metadata = metadata
        // layering orders for dbags and auto assets
        this.DBAG_LAYERING_ORDER = [
            // "Background",
            "BodyType",
            "Eyes",
            "HeadPhones",
            "HeadItems",
            "Mouth",
            "MouthItems",
            "Clothes",
            "Special"
        ]
        
        this.AUTO_LAYERING_ORDER = [
            "Background",
            "ExhaustFumes",
            "Car"
        ]
        

        // global variables used in this class

    }

    generateImage = async ( mfer, auto) => {
        // extract metadata from post request
        // parse dbags and autos 
        const dbagMetadata = this.metadata.dbagAssets
        const autoMetadata = this.metadata.autoAssets
        // Generate dbagMfer with selected mfer
        const dbagImage = await this.generateDbag(dbagMetadata, mfer)
        // build dbag + car
        return await this.generateDbagAuto(dbagImage, autoMetadata, auto)
        // console.log(dbagImage)
    
    }

    generateDbagAuto = async (dbagImage, metadata, auto) => {
        // search for metadata
        let autoMetaData = null;
        for (let i = 0; i < metadata.length; i++)
        {
            // compare on actual metadata
            if (metadata[i].asset_name === auto){
                autoMetaData = metadata[i]
            }
        }
        // get all layers
        const layers = autoMetaData.onchain_metadata
    
        // get file locatins of images
        let assetFileLocations = []
        // for (let i = 0; i < this.AUTO_LAYERING_ORDER.length; i++) {
        for (let i = 0; i < this.AUTO_LAYERING_ORDER.length; i++) {
            const layer = this.AUTO_LAYERING_ORDER[i]
            if (layers[layer] !== undefined)
            {
                // console.log(layers[layer])
                if (layers[layer].includes("Mfentador"))
                {
                    assetFileLocations.push(`../client/src/assets/auto_assets/${layer}/Mfentador_backup.png`)
                }
                else if (layers[layer].includes("D8") && !layers[layer].includes("Mfer D8"))
                    assetFileLocations.push(`../client/src/assets/auto_assets/${layer}/D8_backup.png`)

                else
                {
                    assetFileLocations.push(`../client/src/assets/auto_assets/${layer}/${layers[layer]}.png`)
                }
            }
        }
        // read in image using jimp
        const imagesJimp = assetFileLocations.map(fileLocation => Jimp.read(fileLocation))

        let xScale = 110;
        let yScale = 110;
        let xDbag  = 670;
        let yDbag  = 263;

        // set scale depending which asset we have
        if (autoMetaData.onchain_metadata.Car === "Dbag EG6 White")
        {
            xScale = Orientation[autoMetaData.onchain_metadata.Car].xScale
            yScale = Orientation[autoMetaData.onchain_metadata.Car].yScale
            xDbag = Orientation[autoMetaData.onchain_metadata.Car].xDbag
            yDbag = Orientation[autoMetaData.onchain_metadata.Car].yDbag
        }
        // set correct properties for low rider
        if (autoMetaData.onchain_metadata.Car.includes("Lowrider")){
            xScale = Orientation["Low Rider"].xScale
            yScale = Orientation["Low Rider"].yScale
            xDbag = Orientation["Low Rider"].xDbag
            yDbag = Orientation["Low Rider"].yDbag
        }
        // set correct properties for McMfer
        if (autoMetaData.onchain_metadata.Car.includes("McMfer")){
            xScale = Orientation["McMfer"].xScale
            yScale = Orientation["McMfer"].yScale
            xDbag = Orientation["McMfer"].xDbag
            yDbag = Orientation["McMfer"].yDbag
        }
        if (autoMetaData.onchain_metadata.Car.includes("Mfentador")){
            xScale = Orientation["Mfentador"].xScale
            yScale = Orientation["Mfentador"].yScale
            xDbag = Orientation["Mfentador"].xDbag
            yDbag = Orientation["Mfentador"].yDbag
        }
        // have the mfer drive the boat instead
        dbagImage.scaleToFit(xScale,yScale)
        // dbagImage.flip(true, false)
        return Promise.all(imagesJimp)
            // load in dbags and generate image
            .then((images) => {
                // exhaust is missing
                if (images.length === 2)
                {
                    console.log(images[0].bitmap.height/2, images[0].bitmap.width/2)
                    images[0].composite(dbagImage, xDbag, yDbag)
                    images[0].composite(images[1], 0, 0 )
                }
                // whip has exhaust
                else {
                    console.log(images[0].bitmap.height/2, images[0].bitmap.width/2)
                    images[0].composite(dbagImage, xDbag, yDbag)
                    images[0].composite(images[1], 0,0 )
                    images[0].composite(images[2], 0,0 )
    
                }
                // 
                return images[0]
            })
            .catch((err) => {
                console.error('An error occurred:', err);
            });
    }
    // generate dbag 
    generateDbag = async (dbagMetadata, mfer) => {
        // search for metadata
        let mferMetaData = null;
        for (let i = 0; i < dbagMetadata.length; i++)
        {
            // compare on actual metadata
            if (dbagMetadata[i].onchain_metadata.name === mfer){
                mferMetaData = dbagMetadata[i]
            }
        }
        // return all layers 
        const layers = mferMetaData.onchain_metadata
    
        // get file locatins of images
        let assetFileLocations = []
        for (let i = 0; i < this.DBAG_LAYERING_ORDER.length; i++) {
            const layer = this.DBAG_LAYERING_ORDER[i]
            if (layer === "BodyType" && layers[layer] === ""){
                assetFileLocations.push(`../client/src/assets/mfers_assets/${layer}/Black.png`)
            }
            else if (layers[layer] !== "")
            {
                if (layers[layer] === "Captain's hat")
                {
                    assetFileLocations.push(`../client/src/assets/mfers_assets/${layer}/Captain_s hat.png`)
                }
                else
                {
                    assetFileLocations.push(`../client/src/assets/mfers_assets/${layer}/${layers[layer]}.png`)
                }
            }
        }
        // read in image using jimp
        const imagesJimp = assetFileLocations.map(fileLocation => Jimp.read(fileLocation))
        // return promise
        return Promise.all(imagesJimp)
            // load in dbags and generate image
            .then((images) => {
                // Resize image2 to match the size of image1 (optional)
                // iterate through all images except the first inded (background)
                for (let i = 1; i < images.length; i++)
                {
                    images[0].composite(images[i], 0, 0);
                }
                // return image[0] as thats the background
                return images[0];
            })
            .catch((err) => {
                console.error('An error occurred:', err);
            });
      }
}

// export Nami class
module.exports = ConstructMfer;