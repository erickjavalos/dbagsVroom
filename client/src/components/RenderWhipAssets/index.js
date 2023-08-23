import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_AVAILABLE_ASSETS } from "../../utils/queries"
import RenderWhipSubAssets from "../RenderWhipSubAssets";


const RenderWhipAssets = ({ assets, assetSelected, setAssetSelected }) => {

    // const { loading, error, data } = useQuery(GET_AVAILABLE_ASSETS,
    //     {
    //         variables: {
    //             "assets": assets
    //         }
    //     }
    // )
    if (!assets) {
        return (
            <>
                <h1>No assets</h1>
            </>
        )
    }


    return (
        <>
            {/* {loading ? <>
                <h1>
                    rendering....
                </h1>

            </> : <> */}
            {console.log("whips available")}
            {console.log()}
            {/* assets in wallet per window */}
            {assets.length > 0 ? (
                // render assets
                <>
                    <RenderWhipSubAssets
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
                            <h1 className="text-red">You do not hold any dbags</h1>
                        </div>
                    </div>

                </>
            )}
            {/* </>
            } */}



        </>
    );
};

export default RenderWhipAssets;
