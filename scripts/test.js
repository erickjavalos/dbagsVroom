const { createCanvas, loadImage } = require('canvas');

function combineImages(personImagePath, hatImagePath) {
  // Load the person and hat images
  Promise.all([loadImage(personImagePath), loadImage(hatImagePath)])
    .then(([personImage, hatImage]) => {
      // Create a canvas with the same dimensions as the person image
      const canvas = createCanvas(personImage.width, personImage.height);
      const context = canvas.getContext('2d');

      // Draw the person image onto the canvas
      context.drawImage(personImage, 0, 0);

      // Calculate the position for placing the hat image
      const hatX = (personImage.width - hatImage.width) / 2; // Center horizontally
      const hatY = (personImage.height - hatImage.height) / 2; // Center vertically

      // Draw the hat image onto the canvas
      context.drawImage(hatImage, hatX, hatY);

      // Convert the canvas content to a data URL
      const combinedImageUrl = canvas.toDataURL();

      // Use the combined image URL as needed (e.g., display or save)
      console.log(combinedImageUrl);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Usage: Call the combineImages function with the paths to the person and hat images
const personImageUrl = '../client/src/assets/mfers_assets/BodyType/Alien.png';
const hatImageUrl = '../client/src/assets/mfers_assets/Clothes/Hawaiian shirt.png';
combineImages(personImageUrl, hatImageUrl);
