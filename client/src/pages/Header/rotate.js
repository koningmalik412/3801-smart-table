import React, { useState } from 'react';

const RotateButton = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(true); // New state for box visibility

  const handleTopRotate = () => {
    setIsBoxVisible(false); // Hide the box when rotating
    if (isRotated) {
      document.body.style.transform = "rotate(0deg)";
      setIsRotated(false);
    } else {
      document.body.style.transform = "rotate(180deg)";
      setIsRotated(true);
    }
    document.body.style.transition = "transform 0.5s ease"; // Smooth transition

    // Show the box again after the rotation duration
    setTimeout(() => {
      setIsBoxVisible(true);
    }, 500); // Matches the rotation duration (0.5s)
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      {/* Box */}
      {isBoxVisible && ( // Conditionally render the box
        <div
          style={{ 
            width: '10cm', 
            height: '0.5cm', 
            position: 'absolute', 
            top: '0', 
            left: '-1cm' // Centering the box under the button
          }} 
          className="bg-gray rounded-lg"
        />
      )}

      {/* Button */}
      <button
        onClick={handleTopRotate}
        style={{ width: '8cm', height: '2cm', position: 'relative' }} 
        className="rounded-lg" // Added a background color to the button
      >
      </button>
    </div>
  );
};

export default RotateButton;
