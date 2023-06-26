import React, { useState, useEffect } from "react";
import { Lucid, Blockfrost } from "lucid-cardano";
import blockfrostApiKey from "../../../config";
import Header from "../../components/Header/index";

const Minting = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      const metadata = await lucid.assets.fetchMetadata("{asset_id}");

      const urls = metadata.map((asset) => asset.url);
      setImageUrls(urls);
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

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  return (
    <div>
      {/* Header component renders here */}
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2">
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
          <button
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleMintButtonClick} // Add the click event handler
          >
            Mint
          </button>
        </div>
        <div className="w-1/2">
          <div className="h-1/2 p-6 border border-gray-300 bg-purple-200">
            <h3 className="text-center">Dbags</h3>
            <div className="flex gap-4 mt-4">
              {/* Dbags assets/NFTs render here */}
              {imageUrls
                .slice(currentSlide + 1, currentSlide + 4)
                .map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${currentSlide + index + 2}`}
                    className="w-1/3 object-contain"
                  />
                ))}
            </div>
          </div>
          <div className="h-1/2 p-6 mt-4 border border-gray-300 bg-purple-200">
            <h3 className="text-center">Whips</h3>
            <div className="flex gap-4 mt-4">
              {/* WHIPS assets/NFTs render here */}
              {imageUrls
                .slice(currentSlide + 4, currentSlide + 7)
                .map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${currentSlide + index + 5}`}
                    className="w-1/3 object-contain"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Carousel navigation */}
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          {"<"}
        </button>
        <button
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={nextSlide}
          disabled={currentSlide >= imageUrls.length - 7}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Minting;
