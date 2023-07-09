import React, { useState, useEffect } from 'react';
import RenderAssets from "../../components/RenderAssets";
import RenderResult from "../../components/RenderResult";



const BuildMfer = ({ assets }) => {
  const [dbagAssets, setDbagAssets] = useState()
  const [whipAssets, setWhipAssets] = useState()

  useEffect(() => {
    const dbagAssetsRendered = assets?.dbagAssets || [];
    const whipAssetsRendered = assets?.autoAssets || [];
    
    setDbagAssets(dbagAssetsRendered)
    setWhipAssets(whipAssetsRendered)
}, [assets]);

  return (
    <>
      {/* Container that holds assets and construction of assets*/}
      
      <div className="flex flex-wrap justify-center align-center m-8 " >
        {/* flex items here as reversed */}
        <div className="flex flex-col text-white w-11/12 bg-[rgba(63,65,59,0.9)] rounded-lg">
          {/* title of Header */}
          {/* render assets */}
          <div className="flex flex-row text-center justify-center p-5 m-5">
            <div className="flex flex-col w-2/4 justify-center items-center text-xl">
              <RenderAssets
                assets={dbagAssets}
                name = "dbags"
              />
              <RenderAssets
                assets={whipAssets}
                name = "whips"
              />
            </div>
            
            <RenderResult />
          </div>

        </div>

      </div>
    </>
  );
};

export default BuildMfer;
