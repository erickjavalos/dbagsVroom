import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import RenderAssets from "../RenderDbagAssets";
import { GET_AUTO_ASSETS } from "../../utils/queries"
import RenderWhipAssets from '../RenderWhipAssets';

const QueryWhips = ({ assets, assetSelected, setAssetSelected }) => {
    const name = "whips"
    //  query the auto data
    const { loading, error, data } = useQuery(GET_AUTO_ASSETS,
        {
            variables: {
                "assets": assets
            }
        }
    )
    // extract data
    const whips = data?.getAutoMetaData || []
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
                        <RenderWhipAssets
                            assets={whips}
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

export default QueryWhips;
