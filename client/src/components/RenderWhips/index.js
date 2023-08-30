import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { GET_AVAILABLE_ASSETS } from "../../utils/mutations"
import LoadableImage from '../LoadableImage';
// import image
import defaultImage from "../../assets/mfers_assets/Background/Light orange.png"



function removeTypename(obj) {
    // Check if the input is an object
    if (typeof obj === 'object' && obj !== null) {
        // Create a new object to hold the properties without __typename
        const newObj = {};

        // Iterate through the keys of the input object
        for (const key in obj) {
            // Check if the property is not __typename
            if (key !== '__typename') {
                // Recursively call the function for nested objects
                newObj[key] = removeTypename(obj[key]);
            }
        }

        return newObj;
    }

    // Return non-objects as is
    return obj;
}

const RenderWhips = ({ assets, currentSlide, setAssetSelected, minted, setMinted }) => {
    const [assetSelectedHere, setAssetSelectedHere] = useState('')
    const [assetsAvailable, setAssetsAvailable] = useState([])
    const assetsWindow = assets.slice(currentSlide * 3, currentSlide * 3 + 3)
    const assetsFixed = Object.values(removeTypename(assetsWindow))
    const [getAvailableAssets, { error, data, loading }] = useMutation(GET_AVAILABLE_ASSETS);

    // if the current slide changes we need to requery database to see if assets are available
    useEffect(async () => {
        // return the assets available
        const { data } = await getAvailableAssets({
            variables: { assets: assetsFixed },
        });

        setAssetsAvailable(data?.getAvailableWhips || [])
        // set asset back to false
        minted && setMinted(false)
    }, [currentSlide, minted])



    const handleClick = (asset) => {
        setAssetSelectedHere(asset.onchain_metadata.name)
        setAssetSelected(asset)
    }

    return (
        <>
            {loading ? <>
                <h1>loading...</h1>
            </> : <>
                {assetsAvailable && assetsWindow
                    .map((asset) => {
                        // get length of slice 
                        const assetsWindow = assets.slice(currentSlide * 3, currentSlide * 3 + 3)

                        // express images normally
                        if (assetsWindow.length === 3) {
                            // verify that the asset in the window is available to mint
                            if (assetsAvailable.includes(asset.onchain_metadata.name)) {
                                return (
                                    <div key={asset._id}
                                        className={`w-1/2  m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(151,196,109,1)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
                                        onClick={(e) => handleClick(asset)}
                                    >
                                        {/* import loadingImage component */}
                                        <img
                                            className="rounded-t-lg"
                                            src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                            loading='lazy'
                                        >
                                        </img>
                                        {asset.onchain_metadata.name}
                                    </div>
                                )
                            }
                            // asset is not available
                            else {
                                return (
                                    <div key={asset._id}
                                        className={`w-1/2  m-2 rounded-lg bg-[rgb(0,0,0,0.3)]  pointer-events-none`}
                                        onClick={(e) => handleClick(asset)}
                                    >
                                        <img
                                            className="rounded-t-lg"
                                            src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                            loading='lazy'
                                        >
                                        </img>
                                        {asset.onchain_metadata.name}
                                    </div>
                                )

                            }
                        }
                        // render left for two items in window
                        else if (assetsWindow.length === 2) {
                            // assets.assetsWindow.
                            if (asset._id !== assetsWindow[1]._id) {
                                return (
                                    <div key={asset._id} className="flex flex-row items-center justify-center">
                                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>
                                        {assetsWindow.map((asset) => {
                                            // check if asset has been minted
                                            if (assetsAvailable.includes(asset.onchain_metadata.name)) {
                                                return (
                                                    <div
                                                        key={asset._id}
                                                        className={`w-1/2  m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(151,196,109,1)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
                                                        onClick={(e) => handleClick(asset)}
                                                    >
                                                        <img className="rounded-t-lg"
                                                            src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                                        >
                                                        </img>
                                                        {asset.onchain_metadata.name}
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div
                                                        key={asset._id}
                                                        className={`w-1/2  m-2 rounded-lg  bg-[rgb(0,0,0,0.3)]  pointer-events-none`}
                                                        onClick={(e) => handleClick(asset)}
                                                    >
                                                        <img className="rounded-t-lg"
                                                            src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                                        >
                                                        </img>
                                                        {asset.onchain_metadata.name}
                                                    </div>
                                                )
                                            }
                                        })}

                                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>

                                    </div>

                                )
                            }
                        }
                        // render for one asset left in window
                        else {
                            if (assetsAvailable.includes(asset.onchain_metadata.name)) {
                                return (
                                    <div key={asset._id} className="flex flex-row items-center justify-center">

                                        <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>

                                        <div
                                            className={`w-1/2 m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(151,196,109,1)]'}   active:bg-[rgb(151,196,109,1)] cursor-pointer`}
                                            onClick={(e) => handleClick(asset)}
                                        >
                                            <img className="rounded-t-lg"
                                                src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                            >
                                            </img>
                                            {asset.onchain_metadata.name}
                                        </div>

                                        <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={asset._id} className="flex flex-row items-center justify-center">

                                        <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>

                                        <div
                                            className={`w-1/2 m-2 rounded-lg bg-[rgb(0,0,0,0.3)]  pointer-events-none`}
                                            onClick={(e) => handleClick(asset)}
                                        >
                                            <img className="rounded-t-lg"
                                                src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                            >
                                            </img>
                                            {asset.onchain_metadata.name}
                                        </div>

                                        <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>
                                    </div>
                                )

                            }
                        }

                    })
                }

            </>
            }



        </>
    );
};

export default RenderWhips;
