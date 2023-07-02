import React, { useState, useEffect } from 'react';



const RenderAssets = ({ assets, name }) => {
    const [assetMeta, setAssetMeta] = useState([])

    // set values based on assets we recieve
    useEffect(() => {
        // define an empty array if undefined
        if (assets === undefined) {
            setAssetMeta([])
        }
        else {
            setAssetMeta(assets)
        }
    }, [assets]);

    return (
        <>
            {/* header name of asset */}
            <div className="w-1/5 bg-[rgb(134,155,231)] rounded-lg m-5">
                {name}
            </div>
            {/* assets in wallet per window */}
            {/* {console.log(assets.length)} */}
            {assetMeta.length > 0 ? (
                // render assets
                <>
                    <div className="flex flex-row w-11/12 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                        {assetMeta.map((asset) => 
                        // {
                        //     console.log("https://ipfs.io/ipfs/" + asset.onchain_metadata.image.split("ipfs://")[1])
                        // }
                        (
                            // console.log('hello')
                            // console.log(`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`)
                            <div key={asset._id} className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                            <img className="rounded-lg" src={`https://ipfs.io/ipfs/${asset.onchain_metadata.image.split("ipfs://")[1]}`}></img>
                                {asset.onchain_metadata.name}
                            </div>
                        )
                            // console.log(asset.onchain_metadata.image.split("ipfs://")[1])
                            // <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">

                            //     <img className="rounded-lg" src={"https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"}></img>
                            //     Test card 1

                            // </div>
                        )}
                        {/* <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">

                            <img className="rounded-lg" src={"https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"}></img>
                            Test card 1

                        </div>
                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                            <img className="rounded-lg" src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"></img>
                            Test card 1

                        </div>

                        <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                            <img className="rounded-lg" src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"></img>
                            Test card 1

                        </div> */}
                    </div>
                    {/* {console.log("we have data")}
                    {console.log(assets)} */}
                </>
            ) : (
                <>
                    {/* {console.log("we dont have data")} */}
                    <div className="flex flex-row w-4/5 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg">
                        <div className="w-2/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                            <h1 className="text-red">You do not hold any {name}</h1>
                        </div>
                    </div>

                    {/* {console.log(assets)} */}
                </>
            )}
            {/* <div className="flex flex-row w-4/5 bg-[rgb(123,105,171)] text-sm items-center justify-center p-2 rounded-lg"> */}
            {/* image number 1 */}
            {/* <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                    <img className="rounded-lg" src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"></img>
                    Test card 1

                </div>
                <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                    <img className="rounded-lg" src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"></img>
                    Test card 1

                </div>

                <div className="w-1/4 bg-[rgba(217,217,217,0.5)] m-2 rounded-lg">
                    <img className="rounded-lg" src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"></img>
                    Test card 1

                </div> */}

            {/* </div> */}

            {/* 
                <div className="w-1/5 bg-[rgb(134,155,231)] rounded-lg m-5">
                    whips
                </div>
                <div className="">
                    Assets Cards
                </div> */}




        </>
    );
};

export default RenderAssets;
