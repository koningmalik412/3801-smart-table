import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddEvent = ({ isOpen, onClose, onAddEvent, editingEvent }) => {
  const [title, setTitle] = useState(editingEvent ? editingEvent.title : '');
  const [location, setLocation] = useState(editingEvent ? editingEvent.location : '');
  const [description, setDescription] = useState(editingEvent ? editingEvent.description : '');
  const [isAllDay, setIsAllDay] = useState(editingEvent ? editingEvent.isAllDay : 0);
  const [startTime, setStartTime] = useState(editingEvent ? editingEvent.startTime : '');
  const [endTime, setEndTime] = useState(editingEvent ? editingEvent.endTime : '');
  const [isClash, setIsClash] = useState(editingEvent ? editingEvent.isClash : 0);
  
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setLocation(editingEvent.location);
      setDescription(editingEvent.description);
      setIsAllDay(editingEvent.isAllDay);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setIsClash(editingEvent.isClash);
    }
  }, [editingEvent]);

  if (!isOpen) return null;

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
      isClash: isClash ? 1 : 0,
    };

    onAddEvent(newEvent, editingEvent ? editingEvent.id : null); // Pass event ID for update
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setDescription('');
    setIsAllDay(0);
    setStartTime(null);
    setEndTime(null);
    setIsClash(0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full" ref={popupRef}>
        <h2 className="text-3xl mb-4">{editingEvent ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Start Time</label>
            <DatePicker
              selected={startTime ? new Date(startTime) : null}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">End Time</label>
            <DatePicker
              selected={endTime ? new Date(endTime) : null}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
                className="mr-2"
              />
              All Day
            </label>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue text-white rounded">
               {editingEvent ? "Save Changes" : "Create Event"} {/* Clear label */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
