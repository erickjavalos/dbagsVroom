import React, { useState, useEffect, useRef } from 'react';
import ConstructMfer from '../../utils/ConstructMfer';

const RenderResult = ({ dbag, whip }) => {
    const [mfer, setMfer] = useState();
    const [auto, setAuto] = useState();
    const canvas = useRef(null);

    useEffect(async () => {
        if (canvas.current) {
            if (dbag && whip) {
                // build the mfer + whip
                const constructMfer = new ConstructMfer()
                constructMfer.generateDbagImage(canvas,dbag, whip)
                
            }
            else {
                const context = canvas.current.getContext('2d');
                // Set the canvas background color to brown
                context.fillStyle = 'rgba(202,195,172,1)';
                context.fillRect(0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }, [dbag, whip]);

    // updates the dbag and whip assets
    useEffect(() => {
        setMfer(dbag);
        setAuto(whip);
    }, [dbag, whip]);

    return (
        <>
            <div className="flex flex-col w-2/4">
                <div className='flex flex-col h-5/6 mt-11  justify-center rounded-lg'>
                    <canvas className='rounded-lg' ref={canvas} width={1500} height={500} />
                    <div className='m-2'>
                        {!mfer && <h1>* select your mfer</h1>}
                        {!auto && <h1>* select your whip</h1>}
                    </div>

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
