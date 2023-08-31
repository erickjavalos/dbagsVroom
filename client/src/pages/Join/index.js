import React, { useState, useEffect } from "react";
import backgroundImage from "../../images/background_auto.png"



const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    width: '100vw',
    height: '100vh',
    // position: 'relative', // Added to make the position relative for absolute positioning of the header
    fontFamily: 'architects daughter'
  }

}


function Join() {
  return (
    <>
      <div style={styles.container}>
        <div className="flex flex-col">

          <div className="flex flex-wrap justify-center items-center align-center m-12 " >
            {/* flex items here as reversed */}
            <div className="flex flex-col text-white w-11/12 bg-[rgba(63,65,59,0.90)] rounded-lg">
              {/* title of Header */}
              {/* render assets */}
              <div className="flex flex-row text-center justify-center items-center p-5 m-10">
                TODO: ADD an authentication schema like this https://www.goattribe.games/register/invitation
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Join;
