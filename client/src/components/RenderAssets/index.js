import React, { useState, useEffect } from 'react';


// Render Assets
//
// inputs: <data from database>
// assets: {
//   _id: <val>
//   
//}
// name: <String> project name
// 

const RenderAssets = ({ assets, name }) => {
    const [assetMeta, setAssetMeta] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

    // set values based on assets we recieve
    useEffect(() => {
        // define an empty array if undefined
        if (assets === undefined) {
            setAssetMeta([])
        }
        else {
            setAssetMeta(assets)
        }
    }, [assets]);

    const previousSlide = () => {
        // console.log("previous hit")
        setCurrentSlide(currentSlide - 1)
    }
    const nextSlide = () => {
        console.log("next slide")
        setCurrentSlide(currentSlide + 1)
    }

    return (
        <>
            {/* header name of asset */}
            <div className="w-1/5 bg-[rgb(134,155,231)] rounded-lg m-5">
                {name}
            </div>
            {/* assets in wallet per window */}
            {assetMeta.length > 0 ? (
                // render assets
                <>
                    {/* add left arrow */}
                    <div className="flex flex-row w-11/12 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                        {/* left arrow (<<) */}
                        <button
                            className="m-2 px-2 py-1 text-white bg-[rgba(217,217,217,0.5)] rounded-lg"
                            onClick={previousSlide}
                            disabled={currentSlide === 0}
                        >
                            {"<<"}
                        </button>
                        {/* image cards  */}
                        {assetMeta
                            .slice(currentSlide * 3, currentSlide * 3 + 3)
                            .map((asset) => {
                                // get length of slice 
                                const assetsWindow = assetMeta.slice(currentSlide * 3, currentSlide * 3 + 3)
                                // express images normally
                                if (assetsWindow.length === 3) {
                                    return (
                                        <div key={asset._id} className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                            <img className="rounded-lg"
                                                src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                                onLoad={imageLoaded}
                                            >
                                            </img>
                                            {asset.onchain_metadata.name}
                                        </div>
                                    )
                                }
                                // render left for two items in window
                                else if (assetsWindow.length === 2) {
                                    if (asset._id !== assetsWindow[1]._id)
                                    {
                                        return (
                                            <div key={asset._id} className="flex flex-row items-center justify-center">
                                                <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                                    <img className="rounded-lg"
                                                        src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                                        onLoad={imageLoaded}
                                                    >
                                                    </img>
                                                    {asset.onchain_metadata.name}
                                                </div>
                                                <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                                    <img className="rounded-lg"
                                                        src={`https://ipfs.io/ipfs/${assetsWindow[1].onchain_metadata.image.split("ipfs://")[1]}`}
                                                        onLoad={imageLoaded}
                                                    >
                                                    </img>
                                                    {assetsWindow[1].onchain_metadata.name}
                                                </div>

                                                <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                                </div>
    
                                            </div>
    
                                        )
                                    }
                                }
                                // render for one asset left in window
                                else {
                                    return (
                                        <div key="1" className="flex flex-row w-11/12 items-center justify-center">

                                            <div key={1} className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                            </div>
                                            <div key={asset._id} className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                                <img className="rounded-lg"
                                                    src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                                    onLoad={imageLoaded}
                                                >
                                                </img>
                                                {asset.onchain_metadata.name}
                                            </div>

                                            <div key={2} className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                            </div>
                                        </div>
                                    )
                                }

                            })
                        }
                        {/* right arrow (>>) */}
                        <button
                            className="m-2 px-2 py-1 text-white bg-[rgba(217,217,217,0.5)] rounded-lg"
                            onClick={nextSlide}
                            disabled={!((currentSlide + 1) * 3 < assetMeta.length)}
                        >
                            {">>"}
                        </button>


                    </div>
                    {/* add right arrow */}
                </>
            ) : (
                <>
                    <div className="flex flex-row w-4/5 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                        <div className="w-2/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                            <h1 className="text-red">You do not hold any {name}</h1>
                        </div>
                    </div>

                </>
            )}



        </>
    );
};

export default RenderAssets;
