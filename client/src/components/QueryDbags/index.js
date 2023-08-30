import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import RenderDbagAssets from "../RenderDbagAssets";
import { GET_DBAG_ASSETS } from "../../utils/queries"

const QueryDbags = ({ assets, assetSelected, setAssetSelected }) => {
    //  query the auto data
    const { loading, error, data } = useQuery(GET_DBAG_ASSETS,
        {
            variables: {
                "assets": assets
            }
        }
    )
    // extract data
    const assetsLibrary = data?.getDbagMetaData || []
    // return rendered area
    return (
        <>
            {loading ? <>
                <h1>
                    rendering....
                </h1>

            </> : <>
                {data && (
                    <>
                        <RenderDbagAssets
                            assets={assetsLibrary}
                            assetSelected={assetSelected}
                            setAssetSelected={setAssetSelected}
                            name={'dbags'}
                        />
                    </>
                )}
            </>}

        </>
    );
};

export default QueryDbags;
