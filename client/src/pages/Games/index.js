import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chessboard from "../../assets/images/chess-board.jpeg";
import snakes from "../../assets/images/snakes-and-ladders.png";
import Chess from "../Games/chessboard.js";
import Snakes from "../Games/snakesandladders.js";

const EnlargedChessboard = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative">
        <Chess />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const EnlargedSnakesAndLadders = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative">
        <img 
          src={snakes} 
          alt="Enlarged Snakes and Ladders Board" 
          className="max-w-full max-h-[90vh] object-contain"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Games = () => {
  const [showEnlargedChessboard, setShowEnlargedChessboard] = useState(false);
  const [showEnlargedSnakes, setShowEnlargedSnakes] = useState(false);

  const handleChessboardClick = () => {
    setShowEnlargedChessboard(true);
  };

  const handleSnakesClick = () => {
    setShowEnlargedSnakes(true);
  };

  const handleCloseEnlarged = () => {
    setShowEnlargedChessboard(false);
    setShowEnlargedSnakes(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base p-4">
      <div className="block w-full p-6 bg-brown rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] mb-6">
        <h5 className="text-9xl font-bold text-[#FBF6E3]">BOARD GAMES</h5>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch w-full h-[1000px]">
        <div className="w-full md:w-1/2 p-4">
          <div className="h-full bg-pink rounded-[30px] border-[3px] border-brown overflow-hidden">
            <div className="h-[500px] cursor-pointer" onClick={handleChessboardClick}>
              <Chess />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-9xl font-bold mb-2 text-darkbrown pt-20">Chess</h2>
              <p className="text-brown text-5xl">Click the chess board to enlarge!</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="h-full bg-yellow rounded-[30px] border-[3px] border-brown overflow-hidden">
            <img 
              src={snakes} 
              alt="Snake and Ladder Board" 
              className="w-full h-[500px] object-cover cursor-pointer"
              onClick={handleSnakesClick}
            />
            <div className="p-4 text-center">
              <h2 className="text-9xl font-bold mb-2 text-darkbrown pt-20">Snakes and Ladders</h2>
              <p className="text-brown text-5xl">Click the Snakes and Ladders board to enlarge!</p>
            </div>
          </div>
        </div>
      </div>

      {showEnlargedChessboard && <EnlargedChessboard onClose={handleCloseEnlarged} />}
      {showEnlargedSnakes && <EnlargedSnakesAndLadders onClose={handleCloseEnlarged} />}
    </div>
  );
};

export default Games;
