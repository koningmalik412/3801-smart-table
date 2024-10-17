import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const colors = [
  { color: "Blue", code: "#6E6F84" },
  { color: "Light Blue", code: "#D9D9D9" },
  { color: "Yellow", code: "#FDF5B8" },
  { color: "Pink", code: "#EFB4B4" },
  { color: "Gray", code: "#C6C6C0" },
];

const AddEvent = ({ isOpen, onClose, onAddEvent, editingEvent, onDelete }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isAllDay, setIsAllDay] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");

  const popupRef = useRef(null);

  // Update form fields when editingEvent changes
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setLocation(editingEvent.location);
      setDescription(editingEvent.description);
      setIsAllDay(editingEvent.isAllDay);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setColor(editingEvent.color);
    } else {
      resetForm(); // Reset form for new events
    }
  }, [editingEvent]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (endTime && startTime && endTime <= startTime) {
      alert("End time must be later than start time.");
      return;
    }

    const newEvent = {
      title,
      location,
      description,
      isAllDay: isAllDay ? 1 : 0,
      startTime,
      endTime,
      color,
    };

    if (editingEvent) {
      onDelete(editingEvent.id); // Delete the existing event
    }

    onAddEvent(newEvent, editingEvent ? editingEvent.id : null); // Pass event ID for update
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setDescription("");
    setIsAllDay(0);
    setStartTime(null);
    setEndTime(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
      <div
        className="relative p-6 w-full max-w-3xl bg-base rounded-2xl shadow-xl"
        ref={popupRef}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h6 className="text-5xl my-auto font-semibold text-brown">
            {editingEvent ? "Edit Event" : "Add Event"}
          </h6>
          <button
            onClick={onClose}
            className="text-white bg-blue rounded-lg text-2xl p-1.5 px-3 ml-auto"
          >
            x
          </button>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-gray"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-gray"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-gray"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />

            <div className="mb-4 mt-4 flex items-center">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
                className="mr-2"
              />
              <label className="text-lg font-semibold">All Day</label>
            </div>

            <div className="flex flex-row gap-5 mb-5">
              <div>
                <label className="block text-lg font-semibold mb-2 mt-4">
                  Start Time
                </label>
                <DatePicker
                  selected={startTime ? new Date(startTime) : null}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="mt-2 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2 mt-4">
                  End Time
                </label>
                <DatePicker
                  selected={endTime ? new Date(endTime) : null}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="mt-2 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-gray-400"
                />
              </div>
            </div>

            <select
              className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl placeholder-placeholder-gray mb-5"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="#C6C6C0">Color</option>
              {colors.map((option, index) => {
                return (
                  <option key={index} value={option.code}>
                    {option.color}
                  </option>
                );
              })}
            </select>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-4 bg-gray text-white rounded-lg text-2xl mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-4 bg-blue text-white rounded-lg text-2xl"
              >
                {editingEvent ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
