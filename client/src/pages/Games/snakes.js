import React from "react";
import snakes from "../../assets/images/snakes-and-ladders.png";

const Snakes = ({ onClick }) => {
  return (
    <img
      src={snakes}
      alt="Snakes"
      className="h-full object-cover"
      onClick={onClick} // Add the onClick prop here
    />
  );
};

export default Snakes;
