import React, { useState, useEffect } from "react";
import { Lucid, Blockfrost, CardanoWallet, Cardano } from "lucid-cardano";
import blockfrostApiKey from "../../../config";
import Header from "../../components/Header/index";
import backgroundImage from "../../assets/auto_assets/Background/Trippymferforest.png";

const Minting = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const fetchImageUrls = async () => {
    try {
      const lucid = await Lucid.new(
        new Blockfrost(
          "https://cardano-preprod.blockfrost.io/api/v0",
          blockfrostApiKey
        ),
        "Preprod"
      );

      // Replace '{asset_id}' with the actual asset ID
      const fetchedMetadata = await lucid.assets.fetchMetadata("{asset_id}");

      const urls = fetchedMetadata.map((asset) => asset.url);
      setImageUrls(urls);
      setMetadata(fetchedMetadata);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  const handleMintButtonClick = async () => {
    try {
      // Prepare the necessary parameters for minting
      const privateKey = "YOUR_PRIVATE_KEY"; // Private key of the minting address
      const assetId = "YOUR_ASSET_ID"; // Asset ID of the token being minted
      const quantity = 10; // Number of tokens to mint

      // Create a Cardano wallet instance using the private key
      const wallet = await CardanoWallet.fromPrivateKey(privateKey);

      // Build the transaction
      const transactionBuilder = wallet.newTransactionBuilder();
      transactionBuilder.addOutput(
        Cardano.TransactionOutput.new(
          Cardano.Address.from_bech32("RECIPIENT_ADDRESS"), // Address where the minted tokens will be sent
          Cardano.Value.new(
            Cardano.BigNum.from_str(quantity.toString()),
            Cardano.Assets.new(Cardano.AssetName.from_bytes(assetId))
          )
        )
      );

      // Add the minting policy
      transactionBuilder.addMint(
        Cardano.Value.new(
          Cardano.BigNum.from_str(quantity.toString()),
          Cardano.Assets.new(Cardano.AssetName.from_bytes(assetId))
        )
      );

      // Sign the transaction
      const signedTransaction = await wallet.sign(transactionBuilder);

      // Submit the transaction to the Cardano network
      const transactionResult = await Cardano.submitTransaction(
        signedTransaction
      );

      console.log("Minting successful:", transactionResult);
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  // Slide the carousel to the right
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  // Slide the carousel to the left
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  return (
    <div>
      {/* Header component */}
      <Header />
      {/* Background image */}
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-2/3">
          <div className="flex justify-center pt-28 pb-28 pl-20 pr-20 items-center h-2/3 bg-white bg-opacity-50 rounded-3xl">
            <div className="w-1/2 bg-purple-800 rounded-lg">
              <div className="h-2/3 flex flex-col justify-center items-center">
                <div className="w-full h-2/3">
                  {/* Minted assets/NFT will render here */}
                  {imageUrls.length > 0 && (
                    <img
                      src={imageUrls[0]}
                      alt="Image 1"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
              {/* Minting button */}
              <div className="flex justify-center items-center">
                <button
                  className="w-1/5 py-2 mt-4 bg-blue-400 text-white rounded-2xl hover:bg-blue-600"
                  onClick={handleMintButtonClick}
                >
                  Mint
                </button>
              </div>
            </div>
            <div className="w-1/2 rounded-lg flex flex-col items-center">
              <div className="w-1/4 p-2 text-center text-white bg-blue-400 bg-opacity-70 rounded-lg">
                Dbags
              </div>
              <div className="pb-4"></div>
              <div className="w-10/12 h-1/2 p-6 bg-purple-600 bg-opacity-50 rounded-lg">
                <div className="flex justify-center items-center mb-4"></div>
                <div className="flex gap-4 mt-4">
                  {/* Dbags assets/NFTs render here */}
                  {imageUrls
                    .slice(currentSlide + 1, currentSlide + 4)
                    .map((imageUrl, index) => (
                      <div key={index} className="card">
                        <img
                          src={imageUrl}
                          alt={`Image ${currentSlide + index + 2}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="asset-info">
                          {/* Render the asset name/number */}
                          {metadata[currentSlide + index + 1]?.name ||
                            "Asset Name/Number"}
                        </div>
                      </div>
                    ))}
                </div>
                {/* Carousel navigation */}
                <div className="flex justify-center mt-4">
                  <button
                    className="mr-2 px-2 py-1 text-white"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                  >
                    {"<"}
                  </button>
                  <button
                    className="ml-2 px-2 py-1 text-white"
                    onClick={nextSlide}
                    disabled={currentSlide >= imageUrls.length - 7}
                  >
                    {">"}
                  </button>
                </div>
              </div>
              <div className="pt-4"></div>
              <div className="w-1/4 p-2 text-center text-white bg-blue-400 bg-opacity-70 rounded-lg">
                Whips
              </div>
              <div className="w-10/12 h-1/2 p-6 mt-4 bg-purple-600 bg-opacity-50 rounded-lg">
                <div className="flex justify-center items-center mb-4"></div>
                <div className="flex gap-4 mt-4">
                  {/* WHIPS assets/NFTs render here */}
                  {imageUrls
                    .slice(currentSlide + 4, currentSlide + 7)
                    .map((imageUrl, index) => (
                      <div key={index} className="card">
                        <img
                          src={imageUrl}
                          alt={`Image ${currentSlide + index + 5}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="asset-info">
                          {/* Render the asset name/number */}
                          {metadata[currentSlide + index + 4]?.name ||
                            "Asset Name/Number"}
                        </div>
                      </div>
                    ))}
                </div>
                {/* Carousel navigation */}
                <div className="flex justify-center mt-4">
                  <button
                    className="mr-2 px-2 py-1 text-white"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                  >
                    {"<"}
                  </button>
                  <button
                    className="ml-2 px-2 py-1 text-white"
                    onClick={nextSlide}
                    disabled={currentSlide >= imageUrls.length - 7}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Minting;
