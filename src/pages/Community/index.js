import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddEvent from "./addEvent.js";

const Community = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    handleClosePopup();
  };

  const calculateBoxSize = () => {
    const minSize = 100; // Minimum size of the post-it box
    const maxSize = 200; // Maximum size of the post-it box
    const numEvents = events.length;
    const maxEvents = 9; // Maximum number of events to fit nicely
    const size = Math.max(minSize, Math.min(maxSize, (600 / Math.ceil(numEvents / 3)) * 0.9));
    return size;
  };

  const boxSize = calculateBoxSize();

  return (
    <>
      <div className="absolute w-full px-12 z-10">
        {/* Title */}
        <div className="block mt-12 mb-2">
          <h5 className="text-6xl text-brown">COMMUNITY BOARD</h5>
        </div>

        {/* Event Button */}
        <div className="absolute top-14 right-20">
          <button
            onClick={handleOpenPopup}
            className="bg-pink text-brown text-2xl py-2 px-8 rounded-3xl"
          >
            CREATE AN EVENT
          </button>
        </div>

        {/* Board */}
        <div className="bg-base h-[600px] w-full rounded-[30px] border-[3px] border-brown p-4 overflow-auto">
          <div className="grid grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-blue p-4 rounded-lg shadow-lg"
                style={{
                  width: `${boxSize}px`,
                  height: `${boxSize}px`,
                  gridColumn: (index % 3) + 1,
                  gridRow: Math.floor(index / 3) + 1,
                }}
              >
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 ml-2">
          <Link to="/" className="bg-pink text-2xl py-2 px-8 rounded-3xl">
            BACK
          </Link>
        </div>
      </div>

      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[650px] bg-brown z-0"></div>
      <AddEvent isOpen={isPopupOpen} onClose={handleClosePopup} onAddEvent={handleAddEvent} />
    </>
  );
};

export default Community;
