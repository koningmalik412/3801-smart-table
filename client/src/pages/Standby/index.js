import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Standby = () => {
  const [events, setEvents] = useState([]);

  const router = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Calculate box size based on the number of events
  const calculateBoxSize = (numEvents) => {
    const minSize = 100; // Minimum size of the post-it box
    const maxSize = 800; // Maximum size of the post-it box
    const maxEvents = 12; // Maximum number of events to fit nicely

    // Adjust the box size based on the number of events
    const sizeFactor = Math.max(1, maxEvents - numEvents);
    const size = Math.max(
      minSize,
      Math.min(maxSize, (maxSize / maxEvents) * sizeFactor)
    );

    return size;
  };

  // Calculate font size based on the box size
  const calculateFontSize = (boxSize) => {
    const baseFontSize = 40; // Base font size for smallest box
    const maxFontSize = 80; // Maximum font size for largest box
    const scale = boxSize / 300; // Scale factor for font size based on box size (adjust based on your needs)
    const fontSize = Math.min(maxFontSize, baseFontSize * scale);

    return fontSize;
  };

  // Generate a list of Tailwind background colors
  const colors = ["bg-pink", "bg-blue", "bg-lightblue"];

  return (
    <button
      onClick={() => router(-1)}
      className="bg-black h-screen w-screen fixed top-0 left-0 flex flex-col items-center justify-center z-50 text-black"
    >
      <div className="p-6 text-center w-full flex items-center justify-center">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event, index) => {
              const boxSize = calculateBoxSize(events.length); // Calculate box size
              const fontSize = calculateFontSize(boxSize); // Calculate font size based on box size

              return (
                <div
                  key={event.id}
                  className={`${
                    colors[index % colors.length]
                  } p-4 rounded-lg shadow-md text-center`}
                  style={{ width: `${boxSize}px`, height: `${boxSize}px` }} // Apply dynamic box size
                >
                  <h2
                    className="font-semibold"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {event.title}
                  </h2>

                  {event.isAllDay === 1 ? (
                    // Extract only the date part from startTime if it's an all-day event
                    <p style={{ fontSize: `${fontSize * 0.5}px` }}>
                      {event.startTime.split(" ")[0]}{" "}
                      {/* This extracts the 'DD/MM/YYYY' part */}
                    </p>
                  ) : (
                    <>
                      {/* Extract both time and date for non-all-day events */}
                      <p style={{ fontSize: `${fontSize * 0.5}px` }}>
                        {event.startTime}
                      </p>
                      <p style={{ fontSize: `${fontSize * 0.5}px` }}>
                        {event.endTime}
                      </p>
                    </>
                  )}

                  <p style={{ fontSize: `${fontSize * 0.7}px` }}>
                    {event.location}
                  </p>
                  <p style={{ fontSize: `${fontSize * 0.7}px` }}>
                    {event.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </button>
  );
};

export default Standby;
