import React from "react";
import { useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const Standby = () => {
  const router = useNavigate();
  return (
    <button
      onClick={() => router(-1)}
      className="bg-black h-screen w-screen fixed top-0 left-0 flex items-center justify-center z-50" // Adjust position and z-index
    ></button>
  );
};

export default Standby;
