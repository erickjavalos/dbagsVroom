import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


import QueryRender from "../../components/QueryRender";
import RenderAssets from "../../components/RenderAssets";
import RenderResult from "../../components/RenderResult";


const GET_AUTO_ASSETS = gql`
query GetAutoMetaData($assets: [String]) {
  getAutoMetaData(assets: $assets) {
    _id
    asset
    asset_name
    createdAt
    fingerprint
    initial_mint_tx_hash
    mint_or_burn_count
    onchain_metadata {
      Background
      Car
      ExhaustFumes
      image
      name
    }
    onchain_metadata_standard
    policy_id
    quantity
    updatedAt
  }
}
`;

const GET_DBAG_ASSETS = gql`
query GetAllDbagAssets($assets: [String]) {
  getDbagMetaData(assets: $assets) {
    _id
    asset
    asset_name
    createdAt
    fingerprint
    mint_or_burn_count
    initial_mint_tx_hash
    onchain_metadata {
      mediaType
      image
      Special
      Mouth
      MouthItems
      HeadPhones
      HeadItems
      Eyes
      Clothes
      BodyType
      Background
      name
    }
    onchain_metadata_standard
    policy_id
    quantity
    updatedAt
  }
}`


const BuildMfer = ({ assets }) => {
  // get auto assets 
  // const { whipLoading, whipError, data } = useQuery(GET_AUTO_ASSETS,
  //   {
  //     variables: {
  //       "autoAssets": whipAssetsRendered
  //     }
  //   }
  // )

  // console.log("whip assets")
  // console.log(data)

  // const { dbagLoading, dbagError, dbagAssets } = useQuery(GET_DBAG_ASSETS,
  //   {
  //     variables: {
  //       "dbagAssets": dbagAssetsRendered
  //     }
  //   }
  // )
  const [dbagAssets, setDbagAssets] = useState()
  const [whipAssets, setWhipAssets] = useState()
  const [dbagSelected, setDbagSelected] = useState(false)
  const [whipSelected, setWhipSelected] = useState(false)

  useEffect(() => {
    const dbagAssetsRendered = assets?.dbagAssets || [];
    const whipAssetsRendered = assets?.autoAssets || [];

    setDbagAssets(dbagAssetsRendered)
    setWhipAssets(whipAssetsRendered)

  }, [assets]);

  useEffect(() => {
    // render change in dbag or auto

  }, [dbagSelected, whipSelected])

  const setDbag = (asset) => {
    setDbagSelected(asset)
  }

  const setWhip = (asset) => {
    setWhipSelected(asset)
  }

  return (
    <>
      {/* Container that holds assets and construction of assets*/}

      <div className="flex flex-wrap justify-center align-center m-8 " >
        {/* flex items here as reversed */}
        <div className="flex flex-col text-white w-11/12 bg-[rgba(63,65,59,0.75)] rounded-lg">
          {/* title of Header */}
          {/* render assets */}
          <div className="flex flex-row text-center justify-center p-5 m-5">
            <div className="flex flex-col w-2/4 text-xl">
              <QueryRender
                assets={dbagAssets}
                name="dbags"
                assetSelected={dbagSelected}
                setAssetSelected={setDbag}
                query={GET_DBAG_ASSETS}
              />

              <QueryRender
                assets={whipAssets}
                name="whips"
                assetSelected={whipSelected}
                setAssetSelected={setWhip}
                query={GET_AUTO_ASSETS}
              />

              {/* <RenderAssets
                assets={dbagAssets}
                name="dbags"
                assetSelected={dbagSelected}
                setAssetSelected={setDbag}
              />
              <RenderAssets
                assets={whipAssets}
                name="whips"
                assetSelected={whipSelected}
                setAssetSelected={setWhip}
              /> */}
            </div>

            <RenderResult
              dbag={dbagSelected}
              whip={whipSelected}
            />
          </div>

        </div>

      </div>
    </>
  );
};

export default BuildMfer;
