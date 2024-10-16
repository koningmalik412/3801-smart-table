import React from "react";
import snakes from "../../assets/images/snakes-and-ladders.png";

const Snakes = () => {
    return (
        <img 
            src= {snakes}
            alt="Snakes" 
            className="w-full h-full object-cover"
          />
    );
};

export default Snakes;