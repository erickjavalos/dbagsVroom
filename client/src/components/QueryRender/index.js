import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import RenderAssets from "../RenderAssets";

const QueryRender = ({ assets, name, assetSelected, setAssetSelected, query }) => {
    //  query the auto data
    const { loading, error, data } = useQuery(query,
        {
            variables: {
                "assets": assets
            }
        }
    )
    // extract data
    const assetsLibrary = data?.getAutoMetaData || data?.getDbagMetaData || []
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
                        < RenderAssets
                            assets={assetsLibrary}
                            name={name}
                            assetSelected={assetSelected}
                            setAssetSelected={setAssetSelected}
                        />
                    </>
                )}
            </>}

        </>
    );
};

export default QueryRender;
