import React, { useState, useEffect } from 'react';
import QueryDbags from "../../components/QueryDbags";
import QueryWhips from "../../components/QueryWhips";
import RenderResult from "../../components/RenderResult";



const BuildMfer = ({ assets, walletConnected }) => {  
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
              {/* render and query dbag assets */}
              <QueryDbags
                assets={dbagAssets}
                assetSelected={dbagSelected}
                setAssetSelected={setDbag}
              />
              <QueryWhips
                assets={whipAssets}
                assetSelected={whipSelected}
                setAssetSelected={setWhip}
              />
            </div>

            <RenderResult
              dbag={dbagSelected}
              whip={whipSelected}
              walletConnected={walletConnected}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default BuildMfer;
