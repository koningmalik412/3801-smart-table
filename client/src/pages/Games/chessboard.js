import React from "react";
import chessboard from "../../assets/images/chess-board.jpeg";

const Chess = ({ onClick }) => {
  return (
    <img
      src={chessboard}
      alt="Chess Board"
      className="h-full object-cover"
      onClick={onClick} // Add the onClick prop here
    />
  );
};

export default Chess;
