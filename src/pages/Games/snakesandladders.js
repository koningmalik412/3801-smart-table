import React from "react";
import snakes from "../../assets/images/snakes-and-ladders.png";

const Chess = () => {
    return (
        <img 
            src= {snakes}
            alt="Snakes and Ladders" 
            className="w-full h-full object-cover"
          />
    );
};

export default Chess;