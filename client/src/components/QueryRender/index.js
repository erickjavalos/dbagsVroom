import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import RenderAssets from "../RenderAssets";



const QueryRender = ({ assets, name, assetSelected, setAssetSelected, query }) => {

    const { loading, error, data } = useQuery(query,
        {
            variables: {
                "assets": assets
            }
        }
    )

    const assetsLibrary = data?.getAutoMetaData || data?.getDbagMetaData || []
    return (
        <>
            {data && (
                <>
                    {console.log(assetsLibrary)}
                    < RenderAssets
                        assets={assetsLibrary}
                        name={name}
                        assetSelected={assetSelected}
                        setAssetSelected={setAssetSelected}
                    />
                </>
            )}
        </>
    );
};

export default QueryRender;
