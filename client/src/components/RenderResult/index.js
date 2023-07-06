import React, { useState, useEffect } from 'react';

// will eventually have proprs for assets to combine
const RenderResult = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            {/* end result of constructed image */}
            <div className="flex flex-col w-2/4">
                <div className='flex flex-col h-5/6 mt-11 bg-[rgb(123,105,171)] justify-center rounded-lg'>
                    <img className="rounded-t-lg"
                        src={`https://ipfs.io/ipfs/QmRo6G3zg6RHaZyKfqcQUgmXoWCpnkkAfKuJ8E6kKiuAXQ`}
                    >
                    </img>
                </div>
                <div className='mt-4'>
                    <button type="submit"
                        className="mx-1 text-white bg-[rgb(150,2,132)] hover:bg-[rgb(123,105,171)] rounded-lg text-lg px-4 py-2"
                        // onClick={searchAsset}
                    >
                        mint
                    </button>
                </div>
            </div>

        </>
    );
};

export default RenderResult;
