import React from 'react';

const styles = {
  containerStyle: {
    height: '100vh', // Set the container to fill the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
  },
  card: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    color: 'white',
    width: '90%',
    height: '60%',
    display: 'flex', // Enable flexbox layout
    borderRadius: '20px', // Set border radius to create rounded edges
    flexWrap: 'wrap', // Allow the columns to wrap to a new line
  },
  column: {
    width: '50%', // Each column takes 50% of the card's width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    boxSizing: 'border-box', // Include padding within the column's width calculation
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image fills the container
    borderRadius: '20px', // Apply rounded corners to the images
  },
};

const BuildMfer = () => {
  return (
    <div style={styles.containerStyle}>
      <div style={styles.card}>
        <div style={styles.column}>
          <img
            src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"
            alt="Image 1"
            style={styles.image}
          />
        </div>
        <div style={styles.column}>
          <img
            src="https:/ipfs.io/ipfs/QmaWJEC6NCZdnc4E1CcKxHQ2iAuop72P2RMbpFix3geNDK"
            alt="Image 2"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default BuildMfer;
