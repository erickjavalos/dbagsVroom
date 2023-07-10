import React, { useState, useEffect } from 'react';

// will eventually have proprs for assets to combine
const RenderResult = ({ dbag, whip }) => {
    // console.log(dbag)
    const [mfer, setMfer] = useState()
    const [auto, setAuto] = useState()

    useEffect(() => {
        // console.log("dbags!")
        // console.log(dbag)
        setMfer(dbag)
        setAuto(whip)

    }, [dbag, whip]);

    return (
        <>
            <div className="flex flex-col w-2/4">
                <div className='flex flex-col h-5/6 mt-11  justify-center rounded-lg'>
                    {mfer && auto ? (
                        <img className="rounded-lg"
                            src={`https://ipfs.io/ipfs/QmRo6G3zg6RHaZyKfqcQUgmXoWCpnkkAfKuJ8E6kKiuAXQ`}
                        >
                        </img>
                    ) : (
                        <><div className='flex flex-col h-3/6 rounded-lg justify-center bg-[rgba(202,195,172,1)] text-black'>
                            {!mfer && <h1>* select your mfer</h1>}
                            {!auto && <h1>* select your whip</h1>}
                        </div>

                        </>
                    )}
                </div>
                {mfer && auto &&
                    <div className='mt-4'>
                        <button type="submit"
                            className="mx-1 text-white bg-[rgb(151,196,109,0.8)] hover:bg-[rgb(151,196,109,1)] rounded-lg text-lg px-4 py-2"
                        >
                            mint
                        </button>
                    </div>
                }
            </div>

        </>
    );
};

export default RenderResult;
