import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import LoadingSpinner from '../LoadingSpinner';


// query for graphql

// Render Assets
//
// inputs: <data from database>
// assets: {
//   _id: <val>
//   
//}
// name: <String> project name
// 

const RenderAssets = ({ assets, name, assetSelected, setAssetSelected }) => {

    const [assetMeta, setAssetMeta] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [input, setInput] = useState('')
    const [highLightRed, setHighLightRed] = useState(false)
    const [assetSelectedHere, setAssetSelectedHere] = useState('')
    const [isLoadingAssets, setIsLoadingAssets] = useState(false);
    // const [assetSelected, setAssetSelected] = useState(false)

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
        setCurrentSlide(currentSlide - 1)
    }
    const nextSlide = () => {
        setCurrentSlide(currentSlide + 1)
    }

    const updateSearch = (e) => {
        setInput(e.target.value)
    }
    const searchAsset = () => {
        let found = false
        for (let i = 0; i < assetMeta.length; i++) {
            if (input === assetMeta[i].onchain_metadata.name) {
                setCurrentSlide(Math.floor(i / 3))
                setHighLightRed(false)
                found = true
            }
        }
        // error out 
        if (!found) {
            setHighLightRed(true)
        }
    }


    const handleClick = (asset) => {
        setAssetSelectedHere(asset.onchain_metadata.name)
        setAssetSelected(asset)
    }


    const renderNfts = async () => {
        setIsLoadingAssets(true);
        // Simulate loading delay or actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoadingAssets(false);
      };

    return (
        <>
            {/* header name of assets */}
            {/* assets in wallet per window */}
            {/* Display the loading spinner */}
            {isLoadingAssets && <LoadingSpinner />}
            {assetMeta.length > 0 ? (
                // render assets
                <>
                    {/* add left arrow */}
                    <div className="flex flex-col items-center">
                        <div className="justify-center items-center w-2/5 bg-[rgb(96,107,171)] text-2xl rounded-lg m-2">
                            {name}
                        </div>
                        <div className="flex flex-row justify-center items-center w-11/12 mb-1">
                            {/* filter */}
                            <input
                                type="search"
                                className={`bg-[rgba(96,107,171,1)] rounded-lg relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none  dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary`}
                                placeholder={`Search ${assetMeta.length} ${name}`}
                                aria-label="Search"
                                aria-describedby="button-addon1"
                                onInput={updateSearch}
                            />
                            {/* submit button */}
                            <button type="submit"
                                className="mx-1 text-white bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-sm px-4 py-2"
                                onClick={searchAsset}
                            >
                                <svg aria-hidden="true" className="w-5 h-5 text-white-500 dark:text-white-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                            {/* try again error */}
                            <div className='w-1/12 text-sm/[12px] text-red-500'>
                                {highLightRed && (
                                    <div>try again </div>
                                )}

                            </div>



                        </div>
                        <div className="flex flex-row w-11/12 bg-[rgba(202,195,172,1)] text-sm items-center justify-center p-2 rounded-lg">
                            {/* left arrow (<<) */}
                            {(currentSlide) * 3 === 0 ?
                                <>
                                    <div
                                        className='m-2 px-2 py-1'>

                                    </div>
                                </> :
                                // show arrow normally
                                <>
                                    <button
                                        className="m-2 px-2 py-1 text-white bg-[rgb(96,107,171)] hover:bg-[rgb(151,196,109,1)] rounded-lg"
                                        onClick={previousSlide}
                                        disabled={currentSlide === 0}
                                    >
                                        {"<<"}
                                    </button>
                                </>}
                            {/* image cards  */}
                            {assetMeta
                                .slice(currentSlide * 3, currentSlide * 3 + 3)
                                .map((asset) => {
                                    // get length of slice 
                                    const assetsWindow = assetMeta.slice(currentSlide * 3, currentSlide * 3 + 3)
                                    // express images normally
                                    if (assetsWindow.length === 3) {
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
                                    else if (assetsWindow.length === 2) {
                                        if (asset._id !== assetsWindow[1]._id) {
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
                                                        className={`w-1/2  m-2 rounded-lg ${assetsWindow[1].onchain_metadata.name === assetSelectedHere ? 'bg-[rgb(151,196,109,1)] hover:bg-[rgb(151,196,109,1)]' : 'bg-[rgb(96,107,171)] hover:bg-[rgb(0,0,0,0.3)]'}   active:bg-[rgb(151,196,109,1)]  cursor-pointer`}
                                                        onClick={(e) => handleClick(assetsWindow[1])}
                                                    >
                                                        <img className="rounded-t-lg"
                                                            src={`https://ipfs.io/ipfs/${assetsWindow[1].onchain_metadata.image.split("ipfs://")[1]}`}
                                                        >
                                                        </img>
                                                        {assetsWindow[1].onchain_metadata.name}
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
                            {/* right arrow (>>) */}
                            {((currentSlide + 1) * 3 < assetMeta.length) &&
                                <>

                                    <button
                                        className="m-2 px-2 py-1 text-white bg-[rgb(96,107,171)] hover:bg-[rgb(151,196,109,1)] rounded-lg"
                                        onClick={nextSlide}
                                        disabled={!((currentSlide + 1) * 3 < assetMeta.length)}
                                    >
                                        {">>"}
                                    </button>
                                </>}

                        </div>

                        <div className="flex flex-row w-11/12 text-sm p-2 rounded-lg">
                            {!assetSelected &&
                                <>
                                    <div>* select your {name.slice(0, -1)}</div>
                                </>
                            }
                        </div>
                    </div>
                    {/* <div className="flex flex-col w-11/12">

                        {!dbagSelected &&
                            <>
                                    <div>* select {name.slice(0, -1)}</div>
                            </>
                        }

                    </div> */}
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
