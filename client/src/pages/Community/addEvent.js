import React, { useState, useRef, useEffect } from 'react';

const AddEvent = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

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
    const newEvent = { title, date, time, description };
    onAddEvent(newEvent);
    // Clear fields after adding event
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');
    onClose(); // Close modal after adding
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div 
        ref={popupRef}
        className="relative p-6 w-full max-w-md bg-base rounded-2xl shadow-xl max-w-[800px]"
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-6xl font-semibold text-brown">Add Event</h3>
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
              placeholder="New Event"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm text-lg py-4 px-4 bg-lightblue"
              required
            />
          </div>
          <div>
            <label className="block text-3xl font-medium text-brown">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
              required
            />
          </div>
          <div>
            <label className="block text-3xl font-medium text-brown">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
              required
            />
          </div>
          <div>
            <label className="block text-3xl font-medium text-brown">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm bg-lightblue py-4 px-4"
            ></textarea>
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
