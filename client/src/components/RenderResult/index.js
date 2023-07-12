import React, { useState, useEffect, useRef } from 'react';
import { async } from 'regenerator-runtime';

const RenderResult = ({ dbag, whip }) => {
    const DBAG_LAYERING_ORDER = [
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

    const [mfer, setMfer] = useState();
    const [auto, setAuto] = useState();
    const canvas = useRef(null);

    useEffect(async () => {
        if (canvas.current) {
            if (dbag && whip) {

                const context = canvas.current.getContext('2d');
                context.fillRect(0, 0, canvas.current.width, canvas.current.height);
                // import background image
                const background = new Image();
                background.src = await importImage('auto_assets', `${'Background'}/${whip.onchain_metadata.Background}.png`)
                // append the background
                // background.onload = () => {
                // context.drawImage(background, 0, 0);
                // };

                //import dbags 
                console.log(dbag)
                const layers = dbag.onchain_metadata
                console.log(layers)

                let imageArray = []
                let onloadedTotal = 0
                let totalLayers = 0;
                for (let i = 0; i < DBAG_LAYERING_ORDER.length; i++) {
                // for (let i = 0; i < 1; i++) {
                    const layer = DBAG_LAYERING_ORDER[i]
                    let fileLocation = ''
                    if (layer === "BodyType" && layers[layer] === "") {
                        fileLocation = `${layer}/Black.png`
                        totalLayers += 1
                    }
                    else if (layers[layer] !== "") {
                        if (layers[layer] === "Captain's hat") {
                            fileLocation = `${layer}/Captain_s hat.png`
                            totalLayers += 1
                        }
                        else {
                            fileLocation = `${layer}/${layers[layer]}.png`
                        totalLayers += 1
                        }
                    }
                    // create image and append 
                    if (fileLocation !== '') {
                        console.log(`../../assets/mfers_assets/${layer}/${fileLocation}`)
                        const dbagImage = new Image()
                        dbagImage.src = await importImage('mfers_assets', `${fileLocation}`)
                        dbagImage.onload = () => {
                            onloadedTotal += 1
                            context.drawImage(dbagImage, 0, 0, 3000,3000);

                        }
                        
                        imageArray.push(dbagImage)
                    }
                }
                // console.log(imageArray)
                let numLoaded = 0;
                // for (let i =0; i< imageArray.length; i++)
                // {
                //     console.log(imageArray[i])
                //     // increase counter to ensure images are loaded, we need all images in arr to load
                //     imageArray[i].onload = () => 
                //     {
                //         numLoaded++;
                //         console.log(numLoaded)
                //         console.log(imageArray.length)
                //     }
                // }



            }
            else {
                const context = canvas.current.getContext('2d');
                // Set the canvas background color to brown
                context.fillStyle = 'rgba(202,195,172,1)';
                context.fillRect(0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }, [dbag, whip]);

    // updates the dbag and whip assets
    useEffect(() => {
        // console.log("update!");
        // dbag && console.log(dbag.onchain_metadata.name);
        // whip && console.log(whip.onchain_metadata.name);
        setMfer(dbag);
        setAuto(whip);
    }, [dbag, whip]);

    const importImage = async (collection, asset) => {
        let response = await import(`../../assets/${collection}/${asset}`)
        return response.default
    }

    return (
        <>
            <div className="flex flex-col w-2/4">
                <div className='flex flex-col h-5/6 mt-11  justify-center rounded-lg'>
                    <canvas className='rounded-lg' ref={canvas} width={3000} height={3000} />
                    <div className='m-2'>
                        {!mfer && <h1>* select your mfer</h1>}
                        {!auto && <h1>* select your whip</h1>}
                    </div>

                </div>
                {mfer && auto &&
                    <div className='mt-4'>
                        <button type="submit"
                            className="mx-1 text-white bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-lg px-4 py-2"
                        >
                            mint
                        </button>
                    </div>
                }
            </div>
        </>
    );
};

export default RenderResult;
