import React, { useState, useEffect } from 'react';

const LoadableImage = ({ src, alt, defaultImage }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // detect when image is loaded
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            setLoaded(true);
        };
    }, [src]);

    return (
        <>
            {loaded ? (
                <>
                    {/* <img
                        className={`rounded-t-lg`}
                        src={src}
                        alt={alt}
                    /> */}

                    <img
                        className={`rounded-t-lg`}
                        src={defaultImage}
                        alt={alt}
                    />
                </>
            ) : (
                <>
                    {/* {console.log('not loaded..')}
                    <img
                        className={`rounded-t-lg`}
                        src={defaultImage}
                        alt={alt}
                    /> */}
                </>
            )}
        </>

    );
};

export default LoadableImage;
