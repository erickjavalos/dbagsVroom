import React, { useState, useEffect } from 'react';
import RenderAssets from "../../components/RenderAssets";

const style = {
  // width: '100%',
};


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
      <div className="flex flex-wrap justify-center align-center " style={style}>
        {/* flex items here as reversed */}
        <div className="flex flex-col text-white w-11/12 bg-[rgba(217,217,217,0.7)] rounded-lg">
          {/* title of Header */}
          <div className="text-2xl m-2">
            buidl mfer
          </div>
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
            {/* end result of constructed image */}
            <div className="w-2/4">
              Test section 2
              <div className="flex flex-row">
                image section
              </div>
            </div> 

          </div>

        </div>

      </div>
    </>
  );
};

export default BuildMfer;
