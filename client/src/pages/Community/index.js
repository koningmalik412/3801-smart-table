import React, { useEffect, useState } from "react";
import AddEvent from "./addEvent.js";

const calculateFontSize = (boxSize) => {
  const baseFontSize = 40; // Base font size for smallest box
  const maxFontSize = 80; // Maximum font size for largest box
  const scale = boxSize / 300; // Scale factor for font size based on box size (adjust based on your needs)
  const fontSize = Math.min(maxFontSize, baseFontSize * scale);

  return fontSize;
};

const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50"
      onClick={onClose}
      style={{ zIndex: 40, position: "fixed" }}
    >
      <div
        style={{ height: "1100px" }}
        className="bg-base rounded-xl p-12 shadow-lg max-h-2xl max-w-6xl w-full flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-brown">
          <h2 className="mx-8 mt-8 text-9xl font-semibold">{event.title}</h2>
          <p className="mx-8 mt-20 text-4xl ">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mx-8 mt-8 text-4xl">
            <strong>Start Time:</strong> {event.startTime?.slice(0, 10)}{" "}
            {event.startTime?.slice(11, 16)}
          </p>
          <p className="mx-8 mt-4 text-4xl">
            <strong>End Time:</strong> {event.endTime?.slice(0, 10)}{" "}
            {event.endTime?.slice(11, 16)}
          </p>

          <p className="mx-8 mt-20 text-4xl">{event.description}</p>
        </div>
        <div className="flex justify-center space-x-4 mb-12">
          {" "}
          {/* Increased margin here */}
          <button
            onClick={() => onEdit(event)}
            className="px-48 py-4 text-5xl bg-blue text-white rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="px-44 py-4 text-5xl bg-blue text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);
  // const [previousColor, setPreviousColor] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clickTimer, setClickTimer] = useState(null);
  const clickThreshold = 200;
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditEvent = async (event) => {
    setEditingEvent(event); // Set the current event for editing
    setIsPopupOpen(true); // Open the modal
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
        setSelectedEvent(null); // Close the modal after deleting the event
      } else {
        console.error("Failed to delete event from database");
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        const data = await response.json();

        const updatedEvents = data.map((event) => {
          const boxSize = calculateBoxSize(); // Get the box size
          const position = calculatePosition(boxSize);

          return {
            ...event,
            position,
            fontSize: calculateFontSize(boxSize), // Calculate font size for existing events
          };
        });

        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const calculateBoxSize = () => {
    const minSize = 100;
    const maxSize = 800;
    const numEvents = events.length;
    const maxEvents = 16;

    const sizeFactor = Math.max(1, maxEvents - numEvents);
    const size = Math.max(
      minSize,
      Math.min(maxSize, (maxSize / maxEvents) * sizeFactor)
    );

    return size;
  };

  const calculatePosition = (boxSize) => {
    const boardWidth = 3000;
    const boardHeight = 1100;

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

    let position;
    for (let attempts = 0; attempts < 100; attempts++) {
      position = {
        x: Math.random() * (boardWidth - boxSize),
        y: Math.random() * (boardHeight - boxSize),
      };

      if (!isOverlapping(position)) {
        return position; // If no overlap, return the position
      }
    }

    return position; // Last resort
  };

  const handleAddEvent = async (event) => {
    // const boxSize = calculateBoxSize();
    // const position = calculatePosition(boxSize);

    // const newEvent = {
    //   ...event,
    //   position,
    //   fontSize: calculateFontSize(boxSize), // Calculate font size for the new event only
    // };

    // Send new event to the database
    try {
      await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
    }

    // setPreviousColor(randomColor);
    handleClosePopup();
  };

  const handleMouseDown = (e, index) => {
    setDraggingIndex(index);
    setOffset({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });

    // Start the click timer
    const timer = setTimeout(() => {
      setClickTimer(null); // Reset the timer
    }, clickThreshold);

    setClickTimer(timer);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex !== null) {
      clearTimeout(clickTimer);
      setClickTimer(null);
      const boardWidth = 3000;
      const boardHeight = 1100;
      const boxSize = calculateBoxSize();

      let newX = e.clientX - offset.x - 50;
      let newY = e.clientY - offset.y - 187;

      const buffer = 100;
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

  const handleClick = (event) => {
    if (clickTimer) {
      setSelectedEvent(event); // Only set the selected event if it was a quick click
    }
  };

  const boxSize = calculateBoxSize();

  return (
    <>
      <div
        className="absolute w-full px-12 z-10"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Title */}
        <div className="block mt-12 mb-2">
          <h5 className="text-9xl text-brown">EVENT BOARD</h5>
        </div>

        <div className="absolute top-14 right-20">
          <div
            onClick={handleOpenPopup}
            className="bg-pink rounded-full w-[300px] h-[70px] flex justify-center shadow-3xl absolute z-10 cursor-pointer"
          >
            <h6 className="text-3xl my-auto font-semibold text-brown">
              ADD EVENT
            </h6>
          </div>
          <div className="bg-black rounded-full w-[300px] h-[70px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
        </div>

        {/* Board */}
        <div
          className="bg-base h-[1100px] w-full rounded-[30px] border-[3px] border-brown p-4 overflow-hidden relative"
          onMouseLeave={handleMouseUp}
        >
          <div className="grid grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg`}
                style={{
                  backgroundColor: event.color,
                  width: `${boxSize}px`,
                  height: `${boxSize}px`,
                  position: "absolute",
                  left: event.position?.x || 0,
                  top: event.position?.y || 0,
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
                onClick={() => handleClick(event)}
              >
                <h2
                  className="font-semibold mb-4"
                  style={{ fontSize: `${event.fontSize}px` }}
                >
                  {event.title}
                </h2>

                {event.isAllDay === 1 ? (
                  <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>
                    {event.startTime?.slice(0, 10)}
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>
                      {event.startTime?.slice(0, 10)}{" "}
                      {event.startTime?.slice(11, 16)}
                    </p>
                    <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>
                      {event.endTime?.slice(0, 10)}{" "}
                      {event.endTime?.slice(11, 16)}
                    </p>
                  </>
                )}

                <p style={{ fontSize: `${event.fontSize * 0.6}px` }}>
                  {event.location}
                </p>
                <p style={{ fontSize: `${event.fontSize * 0.4}px` }}>
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[1050px] bg-brown z-0"></div>
      <AddEvent
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onAddEvent={handleAddEvent}
        editingEvent={editingEvent}
        onDelete={handleDeleteEvent}
      />
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          editingEvent={editingEvent}
        />
      )}
    </>
  );
};

export default Community;
