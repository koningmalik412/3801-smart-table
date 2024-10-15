import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Standby = () => {
    return (
        <Link 
            to="/" 
            className="bg-black h-screen w-screen fixed top-0 left-0 flex items-center justify-center z-50" // Adjust position and z-index
        >
        </Link>
    );
};

export default Standby;
