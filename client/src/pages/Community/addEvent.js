import React, { useState, useRef, useEffect } from 'react';

const AddEvent = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAllDay, setIsAllDay] = useState(0);  // Default to 0
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isClash, setIsClash] = useState(0);  // Default to 0

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      location,
      description,
      isAllDay,
      startTime,
      endTime,
      isClash,
    };

    onAddEvent(newEvent);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setDescription('');
    setIsAllDay(0);  
    setStartTime('');
    setEndTime('');
    setIsClash(0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={popupRef}
        className="relative p-6 w-full max-w-md bg-base rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-2xl font-semibold text-brown">Add Event</h3>
          <button
            onClick={onClose}
            className="text-white bg-blue rounded-lg text-2xl p-1.5 px-3 ml-auto"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm text-lg py-4 px-4 bg-lightblue"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm text-lg py-4 px-4 bg-lightblue"
              required
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isAllDay === 1}
              onChange={(e) => setIsAllDay(e.target.checked ? 1 : 0)}  // Convert to 0 or 1
              className="mr-2"
            />
            <label>All Day Event</label>
          </div>
          <div>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Start Time"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="End Time"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isClash === 1}
              onChange={(e) => setIsClash(e.target.checked ? 1 : 0)}  // Convert to 0 or 1
              className="mr-2"
            />
            <label>Allow Event Clashes</label>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue text-base rounded-lg text-white"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;