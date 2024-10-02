import React, { useState } from 'react';

const RotateButton = () => {
  const [isRotated, setIsRotated] = useState(false);

  const handleTopRotate = () => {
    if (isRotated) {
      document.body.style.transform = "rotate(0deg)";
      setIsRotated(false);
    } else {
      document.body.style.transform = "rotate(180deg)";
      setIsRotated(true);
    }
    document.body.style.transition = "transform 0.5s ease"; // Smooth transition
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
            onClick={handleTopRotate}
            style={{ width: '4cm', height: '2cm' }} // Set the width and height in cm
            className="text-white rounded-lg"
        >
        </button>
    </div>

  );
};

export default RotateButton;
