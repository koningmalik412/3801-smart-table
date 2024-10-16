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
    >
      <div 
        style={{ height: '1100px' }}
        className="bg-base rounded-xl p-12 shadow-lg max-h-2xl max-w-6xl w-full" 
        onClick={(e) => e.stopPropagation()} 
      > 
        <h2 className="text-9xl font-semibold"> 
          {event.title}
        </h2>
        <p className="mt-4 text-4xl">{event.description}</p>
        <p className="mt-4 text-4xl">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="mt-4 text-4xl">
          <strong>Start Time:</strong> {event.startTime}
        </p>
        <p className="mt-4 text-4xl">
          <strong>End Time:</strong> {event.endTime}
        </p>
        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => onEdit(event)} 
            className="px-6 py-2 bg-blue text-white rounded-lg"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(event.id)} 
            className="px-6 py-2 bg-blue text-white rounded-lg"
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
  const [previousColor, setPreviousColor] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clickTimer, setClickTimer] = useState(null);
  const clickThreshold = 200; // Time threshold in milliseconds to distinguish click vs. drag

  const handleEditEvent = async (event) => {
    // Here you can implement your logic to open a modal for editing the event
    // Similar to how you did with profiles.
    // For simplicity, let's just log the event for now.
    console.log("Edit event:", event);
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
          const colors = ["bg-pink", "bg-blue", "bg-lightblue"];

          const availableColors = colors.filter((color) => color !== previousColor);
          const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

          return {
            ...event,
            position,
            color: randomColor,
            fontSize: calculateFontSize(boxSize), // Calculate font size for existing events
          };
        });

        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [previousColor]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const calculateBoxSize = () => {
    const minSize = 100;
    const maxSize = 800;
    const numEvents = events.length;
    const maxEvents = 12;

    const sizeFactor = Math.max(1, maxEvents - numEvents);
    const size = Math.max(minSize, Math.min(maxSize, (maxSize / maxEvents) * sizeFactor));

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
    const boxSize = calculateBoxSize();
    const position = calculatePosition(boxSize);
    const colors = ["bg-pink", "bg-blue", "bg-lightblue"];

    const availableColors = colors.filter((color) => color !== previousColor);
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    const newEvent = {
      ...event,
      position,
      color: randomColor,
      fontSize: calculateFontSize(boxSize), // Calculate font size for the new event
    };

    // Send new event to the database
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const createdEvent = await response.json();
      setEvents([...events, createdEvent]);
    } catch (error) {
      console.error("Error adding event:", error);
    }

    setPreviousColor(randomColor);
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
                onClick={() => handleClick(event)}
              >
                <h2 className="font-semibold" style={{ fontSize: `${event.fontSize}px` }}>
                    {event.title}
                </h2>

                {event.isAllDay === 1 ? (
                    <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>
                    {event.startTime.split(" ")[0]} {/* This extracts the 'DD/MM/YYYY' part */}
                    </p>
                ) : (
                    <>
                    <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>{event.startTime}</p>
                    <p style={{ fontSize: `${event.fontSize * 0.5}px` }}>{event.endTime}</p>
                    </>
                )}

                <p style={{ fontSize: `${event.fontSize * 0.6}px` }}>{event.location}</p>
                <p style={{ fontSize: `${event.fontSize * 0.4}px` }}>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[1050px] bg-brown z-0"></div>
      <AddEvent isOpen={isPopupOpen} onClose={handleClosePopup} onAddEvent={handleAddEvent} />
      {selectedEvent && (
          <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} 
          onEdit={handleEditEvent} 
          onDelete={handleDeleteEvent} 
          />
        )}
    </>
  );
};

export default Community;
