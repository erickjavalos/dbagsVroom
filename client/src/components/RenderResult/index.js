import React, { useState, useEffect, useRef } from 'react';
import BuildMfer from '../../utils/BuildMfer';

// import img from '../../assets/auto_assets/Background/ASpicyMfer.png'

// import useImage from '../../utils/useImage.js';

// will eventually have proprs for assets to combine
const RenderResult = ({ dbag, whip }) => {
    const [mfer, setMfer] = useState()
    const [auto, setAuto] = useState()

    const [image, setImage] = useState('');


    function loadImage(src) {
        // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
        var img = new Image();

        img.src = src;

        return img;
    }


    const generateImage = async () => {
        // build mfer

        const buildMfer = new BuildMfer(dbag, whip)
        await buildMfer.compose()

        //************* */
        // const img1 = useImage('../../assets/auto_assets/Background/ASpicyMfer.png')
        // console.log(img1)
        // console.log(loading, error, imageTest)
        const images = [
            'Background/DbagDesert.png',
            'Car/McMfer Orange.png'
        ]

        let response = await import(`../../assets/auto_assets/${images[0]}`)
        const img1_test = response.default


        response = await import(`../../assets/auto_assets/${images[1]}`)
        const img2_test = response.default

        // setImage(img1)

        // load image using loadImage()

        // const img3 = loadImage(`./test.png`)
        // console.log(img3)
        const img1 = loadImage(img1_test)
        const img2 = loadImage(img2_test)

        // setImage(img1_test)

        // TODO: Figure out how to combine two images after opening 
        // get layers from data
        // const dbagLayers = mfer.onchain_metadata
        // console.log(dbagLayers)
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // ctx.drawImage(img1, 0, 0);
        // ctx.drawImage(img2, 0, 0);

        // const imageData = canvas.toDataURL("image/png");
        // console.log(img1_test)
        // let img = new Image()
        // img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tux.svg/1200px-Tux.png"
        // console.log("img")
        // console.log(img)
        // setImage(img

        //   );
        // ctx.drawImage(img1, 0, 0)
        const test = new Image();
        test.src = "https://ipfs.io/ipfs/QmRo6G3zg6RHaZyKfqcQUgmXoWCpnkkAfKuJ8E6kKiuAXQ";

        test.onload = () => {
            console.log('onloaded?')
            console.log(test)
            ctx.drawImage(test, 0, 0, 1000, 1000);
        };

        // // Draw something on the canvas
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, 100, 100);

        // // Get the image data from the canvas
        const imageData = canvas.toDataURL("image/png");
        // console.log("generated image url:")
        console.log(imageData)

        // Set the image state
        setImage(imageData);
    };


    const canvas = useRef();
    useEffect(() => {
        const context = canvas.current.getContext('2d');
        // const context = canvas.getContext("2d");
        const image = new Image();
        image.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png";
        image.onload = () => {
            context.drawImage(image, 0, 0, 500, 500);
        };
    }, []);

    // useEffect(() => {
    //     console.log("update!")
    //     dbag && console.log(dbag.onchain_metadata.name)
    //     whip && console.log(whip.onchain_metadata.name)
    //     setMfer(dbag)
    //     setAuto(whip)

    //     // generate image when update occurs
    //     if (dbag && whip) {
    //         // generateImage()
    //     }

    // }, [dbag, whip]);


    // const loadImage = imageName => (assets(`./${imageName}`).default);


    return (
        <>
            <div className="flex flex-col w-2/4">
                <div className='flex flex-col h-5/6 mt-11  justify-center rounded-lg'>
                    {mfer && auto ? (
                        // <img className="rounded-lg"
                        //     src={image}
                        // >
                        // </img>
                        // <>
                        // </>
                        <canvas ref={myCanvas} width={500} height={500} />
                    ) : (
                        <><div className='flex flex-col h-3/6 rounded-lg justify-center bg-[rgba(202,195,172,1)] text-black'>
                            {!mfer && <h1>* select your mfer</h1>}
                            {!auto && <h1>* select your whip</h1>}
                        </div>

                        </>
                    )}
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
