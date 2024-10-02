import React from "react";
import chessboard from "../../assets/images/chess-board.jpeg";

const Chess = () => {
    return (
        <img 
            src= {chessboard}
            alt="Chess Board" 
            className="w-full h-full object-cover"
          />
    );
};

export default Chess;