import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/auto_assets/Background/Trippymferforest.png"

const styles = {
  container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
  }
};

function Test() {

  

  return (
    <>
      <div style={styles.container}>

      </div>
    </>
  );
}

export default Test;
