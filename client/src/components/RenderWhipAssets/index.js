import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_AVAILABLE_ASSETS } from "../../utils/queries"
import RenderWhipSubAssets from "../RenderWhipSubAssets";


const RenderWhipAssets = ({ assets, assetSelected, setAssetSelected, minted, setMinted }) => {


    return (
        <>
            {/* assets in wallet per window */}
            {assets.length > 0 ? (

                // render assets
                <>
                    <RenderWhipSubAssets
                        assets={assets}
                        assetSelected={assetSelected}
                        setAssetSelected={setAssetSelected}
                        minted={minted}
                        setMinted={setMinted}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div className="justify-center items-center w-2/5 bg-[rgb(96,107,171)] text-2xl rounded-lg m-2">
                            whips
                        </div>
                        <div className="flex flex-row w-4/5 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                            <div className="w-2/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                <h1 className="text-red">You do not hold any whips</h1>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default RenderWhipAssets;
