import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/auto_assets/Background/Trippymferforest.png"

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    position: 'relative', // Added to make the position relative for absolute positioning of the header
  },
  header: {
    position: 'absolute',
    color: 'white',
    top: 0,
    right: 0,
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'architects daughter', // Set the font-family to "architects daughter"
  },
  button: {
    marginLeft: '20px',
    fontSize: "20px",
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'architects daughter', // Set the font-family to "architects daughter"
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    right: 0,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '4px',
  },
}



function Test() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.button} onClick={toggleDropdown}>
            Connect Mfer Wallet
          </button>
          <button style={styles.button}>Log Mfer Out</button>
        </div>
        {showDropdown && (
          <div style={styles.dropdown}>
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
}


export default Test;
