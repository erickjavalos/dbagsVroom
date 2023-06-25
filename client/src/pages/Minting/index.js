import React, { useState, useEffect } from 'react';
import { Lucid, Blockfrost } from 'lucid-cardano';
import blockfrostApiKey from '../../../config';
import Header from '../../components/Header/index'; // Import the Header component

const Minting = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const fetchImageUrls = async () => {
    try {
      const lucid = await Lucid.new(
        new Blockfrost(
          'https://cardano-preprod.blockfrost.io/api/v0',
          blockfrostApiKey
        ),
        'Preprod'
      );

      // Replace '{asset_id}' with the actual asset ID
      const metadata = await lucid.assets.fetchMetadata('{asset_id}');

      const urls = metadata.map(asset => asset.url);
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };

  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 bg-purple-900">
          <div className="h-2/3 flex flex-col justify-center items-center">
            <div className="w-full h-2/3">
              {/* Render the first image */}
              {imageUrls.length > 0 && (
                <img
                  src={imageUrls[0]}
                  alt="Image 1"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
          <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Mint
          </button>
        </div>
        <div className="w-1/2">
          <div className="h-1/3">
            <div className="w-full p-6 border border-gray-300 bg-purple-200">
              <h3 className="text-center">Dbags</h3>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Render three images */}
                {imageUrls.slice(1, 4).map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 2}`}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-2/3">
            <div className="w-full p-6 mt-4 border border-gray-300 bg-purple-200">
              <h3 className="text-center">WHIPS</h3>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Render three images */}
                {imageUrls.slice(4, 7).map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 5}`}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minting;
