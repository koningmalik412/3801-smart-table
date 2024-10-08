import React, { useState} from "react";
import { Link } from "react-router-dom";
import AddEvent from "./addEvent.js";

const Community = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const calculateBoxSize = () => {
    const minSize = 100; // Minimum size of the post-it box
    const maxSize = 800; // Maximum size of the post-it box
    const numEvents = events.length;
    const maxEvents = 12; // Maximum number of events to fit nicely
  
    // Adjust the box size based on the number of events
    const sizeFactor = Math.max(1, maxEvents - numEvents); 
    const size = Math.max(minSize, Math.min(maxSize, (maxSize / maxEvents) * sizeFactor));
  
    return size;
  };

  const calculatePosition = (boxSize) => {
    const boardWidth = 3000; 
    const boardHeight = 1100; 
    let position;

    // Function to check if the new position overlaps with any existing events
    const isOverlapping = (pos) => {
        return events.some((event) => {
            const eventX = event.position?.x || 0;
            const eventY = event.position?.y || 0;
            return (
                pos.x < eventX + boxSize &&
                pos.x + boxSize > eventX &&
                pos.y < eventY + boxSize &&
                pos.y + boxSize > eventY
            );
        });
    };

    // Attempt to find a non-overlapping position for the new event
    for (let attempts = 0; attempts < 100; attempts++) {
        position = {
            x: Math.random() * (boardWidth - boxSize),
            y: Math.random() * (boardHeight - boxSize),
        };

        if (!isOverlapping(position)) {
            return position; // If no overlap, return the position
        }
    }

    // If overlapping persists, resize existing events to create space
    events.forEach((event) => {
        const currentX = event.position?.x || 0;
        const currentY = event.position?.y || 0;

        // Calculate distance from the new position to existing event
        const distanceX = Math.abs(position.x - currentX);
        const distanceY = Math.abs(position.y - currentY);
        
        // If within a certain threshold, adjust size
        if (distanceX < boxSize && distanceY < boxSize) {
            // Reduce the size of existing events
            const newSize = Math.max(100, boxSize * 0.8); // Reduce size by 20% with a minimum of 100
            event.position = {
                ...event.position,
                width: newSize,
                height: newSize,
            };
        }
    });

    // Re-attempt to find a non-overlapping position
    for (let attempts = 0; attempts < 100; attempts++) {
        position = {
            x: Math.random() * (boardWidth - boxSize),
            y: Math.random() * (boardHeight - boxSize),
        };

        if (!isOverlapping(position)) {
            return position; // If no overlap, return the position
        }
    }

    // As a last resort, return the last calculated position
    return position;
  };

  const [previousColor, setPreviousColor] = useState(null); // Track the previous color

  const handleAddEvent = (event) => {
      const boxSize = calculateBoxSize();
      const position = calculatePosition(boxSize);
      const colors = ["bg-pink", "bg-blue", "bg-lightblue"];

      // Filter out the previous color to avoid repeating
      const availableColors = colors.filter(color => color !== previousColor);
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

      setEvents([...events, { ...event, position, color: randomColor }]);
      setPreviousColor(randomColor); // Update the previous color after assigning

      handleClosePopup();
  };

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, index) => {
    setDraggingIndex(index);
    setOffset({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingIndex !== null) {
      const boardWidth = 3000; // Width of the event board
      const boardHeight = 1100; // Height of the event board
      const boxSize = calculateBoxSize(); // Current size of the dragged box
      
      // Calculate new position with boundary checks
      let newX = e.clientX - offset.x - 50; // Adjust the x position based on offset
      let newY = e.clientY - offset.y - 187; // Adjust the y position based on offset
      
      // Add buffer to the boundaries (e.g., 100px)
      const buffer = 100;

      // Ensure the new X position is within the board boundaries
      newX = Math.max(-buffer, Math.min(newX, boardWidth - boxSize + buffer));
      newY = Math.max(-buffer, Math.min(newY, boardHeight - boxSize + buffer));
  
      const newEvents = [...events];
      newEvents[draggingIndex] = {
        ...newEvents[draggingIndex],
        position: {
          x: newX,
          y: newY,
        },
      };
      setEvents(newEvents);
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const boxSize = calculateBoxSize();

  return (
    <>
      <div className="absolute w-full px-12 z-10" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {/* Title */}
        <div className="block mt-12 mb-2">
          <h5 className="text-9xl text-brown">EVENT BOARD</h5>
        </div>

        <div className="absolute top-14 right-20">
          <div 
            onClick={handleOpenPopup} 
            className="bg-pink rounded-full w-[350px] h-[70px] flex justify-center shadow-3xl absolute z-10 cursor-pointer"
          >
            <h6 className="text-3xl my-auto font-semibold text-brown">CREATE AN EVENT</h6>
          </div>
          <div className="bg-black rounded-full w-[350px] h-[70px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
        </div>

        {/* Board */}
        <div className="bg-base h-[1100px] w-full rounded-[30px] border-[3px] border-brown p-4 overflow-auto relative"
         onMouseLeave={handleMouseUp}>
          <div className="grid grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className={`${event.color} p-4 rounded-lg shadow-lg`}
                style={{
                  width: `${boxSize}px`,
                  height: `${boxSize}px`,
                  position: "absolute",
                  left: event.position?.x || 0, 
                  top: event.position?.y || 0, 
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                <h3 className="text-6xl font-bold">{event.title}</h3>
                <p className="text-4xl">{event.date}</p>
                <p className="text-2xl">{event.time}</p>
                <p className="text-4xl">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {/* <div className="mt-12 ml-2">
          <Link to="/" className="bg-pink text-5xl py-2 px-8 rounded-3xl">
            BACK
          </Link>
        </div> */}
      </div>

      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[1050px] bg-brown z-0"></div>
      <AddEvent isOpen={isPopupOpen} onClose={handleClosePopup} onAddEvent={handleAddEvent} />
    </>
  );
};

export default Community;
