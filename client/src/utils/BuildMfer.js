class ConstructMfer {
    constructor(dbag, whip) {
        // initialize the mfers and dbags in the wallet
        this.dbag = dbag
        this.whip = whip
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
    compose = async () => {
        console.log('composing...')


        // generate image for dbags 
        const layers = this.dbag.onchain_metadata
        // get file locatins of images
        let imageArray = []
        for (let i = 0; i < this.DBAG_LAYERING_ORDER.length; i++) {
            const layer = this.DBAG_LAYERING_ORDER[i]
            let fileLocation = ''
            if (layer === "BodyType" && layers[layer] === "") {
                fileLocation = `${layer}/Black.png`
            }
            else if (layers[layer] !== "") {
                if (layers[layer] === "Captain's hat") {
                    fileLocation = `${layer}/Captain_s hat.png`
                }
                else {
                    fileLocation = `${layer}/${layers[layer]}.png`
                }
            }
            // create image and append 
            if (fileLocation !== '') {
                console.log(`../assets/mfer_assets/${fileLocation}`)
                let response = await import(`../assets/mfers_assets/${fileLocation}`)
                const img_imported = response.default
                console.log(img_imported)
                let img = new Image()
                // img.src = `./assets/mfer_assets/${fileLocation}`
                // imageArray.push(img)
            }
        }

        // **************************************************
        // create image
        // **************************************************

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // let numLoaded = 0
        // // iterate through each one and ensure each image is loaded
        // for (let i = 0; i < imageArray.length; i++) {
        //     // console.log(imageArray[i].src)
        //     // imageArray[i].onload = () => {
        //     //     numLoaded++
        //     //     console.log('loaded!')
        //     // all images have been loaded successfully, now we layer...
        //     // if (numLoaded === imageArray.length) {
        //     // create a canvas to draw ontop of 
        //     // for (let j = 0; j < imageArray.length; j++) {
        //     //     console.log('getting image.....', j)
        //     // ctx.drawImage(imageArray[i], 0, 0)
        //     // }

        //     // }
        // }
    // }

        // console.log(canvas.toDataURL("image/png"))


    }

}

// export Nami class
module.exports = ConstructMfer;