import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_AVAILABLE_ASSETS } from "../../utils/queries"


const RenderSubAssets = ({ assets, setAssetSelected }) => {
    console.log(assets)
    //  query the auto data
    const { loading, error, data } = useQuery(GET_AVAILABLE_ASSETS,
        {
            variables: {
                "assets": assets
            }
        }
    )
    // extract data
    // const assetsLibrary = data?.getAutoMetaData || data?.getDbagMetaData || []
    // return rendered area
    const [assetSelectedHere, setAssetSelectedHere] = useState('')


    const handleClick = (asset) => {
        setAssetSelectedHere(asset.onchain_metadata.name)
        setAssetSelected(asset)
    }

    return (
        <>

            {loading ? <>
                <h1>
                    rendering....
                </h1>

            </> : <>
                {console.log(data)}
                {assets
                    .map((asset) => {
                        // get length of slice 
                        // const assets = assets.len
                        // express images normally
                        if (assets.length === 3) {
                            return (
                                <div key={asset._id}
                                    className={`w-1/2  m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(0,0,0,0.3)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
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
                        // render left for two items in window
                        else if (assets.length === 2) {
                            if (asset._id !== assets[1]._id) {
                                return (
                                    <div key={asset._id} className="flex flex-row items-center justify-center">
                                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>

                                        <div
                                            className={`w-1/2  m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(0,0,0,0.3)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
                                            onClick={(e) => handleClick(asset)}
                                        >
                                            <img className="rounded-t-lg"
                                                src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}
                                            >
                                            </img>
                                            {asset.onchain_metadata.name}
                                        </div>
                                        <div
                                            className={`w-1/2  m-2 rounded-lg ${assets[1].onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(0,0,0,0.3)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
                                            onClick={(e) => handleClick(assets[1])}
                                        >
                                            <img className="rounded-t-lg"
                                                src={`https://ipfs.io/ipfs/${assets[1].onchain_metadata.image.split("ipfs://")[1]}`}
                                            >
                                            </img>
                                            {assets[1].onchain_metadata.name}
                                        </div>

                                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                        </div>

                                    </div>

                                )
                            }
                        }
                        // render for one asset left in window
                        else {
                            return (
                                <div key={asset._id} className="flex flex-row items-center justify-center">

                                    <div className="w-1/2 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                    </div>

                                    <div
                                        className={`w-1/2 m-2 rounded-lg ${asset.onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(0,0,0,0.3)]'}   active:bg-[rgb(151,196,109,1)] cursor-pointer`}
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

                    })
                }
            </>
            }

        </>
    );
};

export default RenderSubAssets;
