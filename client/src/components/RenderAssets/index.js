import React, { useState, useEffect } from 'react';
import RenderSubAssets from "../RenderSubAssets";



const RenderAssets = ({ assets, name, assetSelected, setAssetSelected }) => {



    if (!assets) {
        return (
            <>
                <h1>No assets</h1>
            </>
        )
    }


    return (
        // <>
        //     <h1>Golden</h1>
        // </>
        <>
            {/* header name of assets */}
            {/* assets in wallet per window */}
            {assets.length > 0 ? (
                // render assets
                <>


                    <RenderSubAssets
                        assets={assets}
                        name={name}
                        assetSelected={assetSelected}
                        setAssetSelected={setAssetSelected}
                    />
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
