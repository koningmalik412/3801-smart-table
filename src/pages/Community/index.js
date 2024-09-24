import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddEvent from "./addEvent.js";

const Community = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const calculateBoxSize = () => {
    const minSize = 400; // Minimum size of the post-it box
    const maxSize = 800; // Maximum size of the post-it box
    const numEvents = events.length;
    const maxEvents = 9; // Maximum number of events to fit nicely
    const size = Math.max(minSize, Math.min(maxSize, (600 / Math.ceil(numEvents / 3)) * 0.9));
    return size;
  };
  

  const calculatePosition = (boxSize) => {
    const boardWidth = 600; 
    const boardHeight = 1100; 
    let position;

    let isOverlapping;
    do {
      position = {
        x: Math.random() * (boardWidth - boxSize),
        y: Math.random() * (boardHeight - boxSize),
      };

      // Check for overlap with existing events
      isOverlapping = events.some((event) => {
        const eventX = event.position?.x || 0;
        const eventY = event.position?.y || 0;
        return (
          position.x < eventX + boxSize &&
          position.x + boxSize > eventX &&
          position.y < eventY + boxSize &&
          position.y + boxSize > eventY
        );
      });
    } while (isOverlapping);

    return position;
  };

  const handleAddEvent = (event) => {
    const boxSize = calculateBoxSize();
    const position = calculatePosition(boxSize);
    setEvents([...events, { ...event, position }]); 
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
      const newEvents = [...events];
      newEvents[draggingIndex] = {
        ...newEvents[draggingIndex],
        position: {
          x: e.clientX - offset.x - 50,
          y: e.clientY - offset.y - 195,
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

        {/* Event Button */}
        <div className="absolute top-14 right-20">
          <button
            onClick={handleOpenPopup}
            className="bg-pink text-brown text-5xl py-2 px-8 rounded-3xl"
          >
            CREATE AN EVENT
          </button>
        </div>

        {/* Board */}
        <div className="bg-base h-[1100px] w-full rounded-[30px] border-[3px] border-brown p-4 overflow-auto relative">
          <div className="grid grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-blue p-4 rounded-lg shadow-lg"
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
        <div className="mt-12 ml-2">
          <Link to="/" className="bg-pink text-5xl py-2 px-8 rounded-3xl">
            BACK
          </Link>
        </div>
      </div>

      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[1050px] bg-brown z-0"></div>
      <AddEvent isOpen={isPopupOpen} onClose={handleClosePopup} onAddEvent={handleAddEvent} />
    </>
  );
};

export default Community;
