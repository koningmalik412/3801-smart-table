// StandbyButton.js
import React from "react";
import { Link } from "react-router-dom";
import { Power } from "@phosphor-icons/react"; 

const StandbyButton = () => {
  return (
    <div className="fixed bottom-0 left-5 p-4"> {/* Positioning the button */}
      <Link 
        to="/standby" // Link to the Standby page
        className="text-gray py-2 px-4 rounded text-center flex items-center justify-center"
      >
        <Power size={90} weight="fill" className="mr-2" /> {/* Power icon */}
      </Link>
    </div>
  );
};

export default StandbyButton;

