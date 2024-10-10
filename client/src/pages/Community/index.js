import React, { useEffect, useState } from "react";

const EventModal = ({ onOpen, onClose, editingEvent }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isAllDay, setIsAllDay] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isClash, setIsClash] = useState(0);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setLocation(editingEvent.location);
      setDescription(editingEvent.description);
      setIsAllDay(editingEvent.isAllDay || 0);
      setStartTime(editingEvent.startTime || "");
      setEndTime(editingEvent.endTime || "");
      setIsClash(editingEvent.isClash || 0);
    }
  }, [editingEvent]);

  const handleSubmit = async () => {
    const eventData = {
      title,
      description,
      isAllDay: isAllDay ? 1 : 0,
      startTime,
      endTime,
      location,
      isClash: isClash ? 1 : 0,
    };

    console.log(eventData)

    if (editingEvent) {
      await fetch(`http://localhost:3001/api/events/${editingEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
    } else {
      await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
    }
    onClose();
  };

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-3xl bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b">
          <h6 className="text-3xl">
            {editingEvent ? "Edit Event" : "Create Event"}
          </h6>
          <button onClick={onClose} className="text-xl p-1.5">x</button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Event Title"
            className="mt-4 w-full p-4 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="mt-4 w-full p-4 rounded-xl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="mt-4 w-full p-4 rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
              className="mr-2"
            />
            <label>All Day Event</label>
          </div>

          <input
            type="text"
            placeholder="Start Time"
            className="mt-4 w-full p-4 rounded-xl"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="End Time"
            className="mt-4 w-full p-4 rounded-xl"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={isClash}
              onChange={(e) => setIsClash(e.target.checked)}
              className="mr-2"
            />
            <label>Allow Event Clashes</label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-4 bg-blue text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const openModal = (event = null) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
      } else {
        console.error("Failed to delete event from database");
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div className="w-full p-6 bg-blue border rounded shadow flex justify-between items-center">
        <h5 className="text-3xl font-bold text-white">EVENTS</h5>
        <button
          onClick={() => openModal(null)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 bg-white border rounded-lg shadow-lg"
          >
            <h5 className="text-2xl">{event.title}</h5>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            {/* if  even.isAllDay == 1: */}
            <p>All Day: {event.isAllDay === 1 ? "Yes" : "No"}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            {/* <p>Clash Allowed: {event.isClash === 1 ? "Yes" : "No"}</p> */}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => openModal(event)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EventModal
        onOpen={isModalOpen}
        onClose={closeModal}
        editingEvent={editingEvent}
      />
    </div>
  );
};

export default EventPage;
