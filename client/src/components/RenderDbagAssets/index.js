import React, { useState, useEffect } from 'react';
import RenderDbagSubAssets from "../RenderDbagSubAssets";

const RenderDbagAssets = ({ assets, name, assetSelected, setAssetSelected }) => {



    if (!assets) {
        return (
            <>
                <h1>No assets</h1>
            </>
        )
    }


    return (
        <>
            {/* assets in wallet per window */}
            {assets.length > 0 ? (
                // render assets
                <>
                    <RenderDbagSubAssets
                        assets={assets}
                        assetSelected={assetSelected}
                        setAssetSelected={setAssetSelected}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div className="justify-center items-center w-2/5 bg-[rgb(96,107,171)] text-2xl rounded-lg m-2">
                            dbags
                        </div>
                        <div className="flex flex-row w-4/5 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                            <div className="w-2/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                                <h1 className="text-red">You do not hold any {name}</h1>
                            </div>
                        </div>
                    </div>

                </>
            )}



        </>
    );
};

export default RenderDbagAssets;
