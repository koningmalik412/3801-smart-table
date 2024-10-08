import React, { useState } from "react";

const Settings = () => {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(50);
  const [options, setOptions] = useState({
    lights: false,
    sounds: false,
    parentalMode: false,
  });
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="flex">
      {/* Left Half */}
      <div className="w-1/2 p-4">
        {/* Made the SETTINGS title much bigger */}
        <h5 className="text-6xl font-bold mb-4">SETTINGS</h5>

        {/* Volume Slider */}
        <div className="mb-6">
          <label className="block text-xl font-bold mb-2">Volume</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full"
          />
          <p className="mt-2">Current Volume: {volume}%</p>
        </div>

        {/* Brightness Slider */}
        <div className="mb-6">
          <label className="block text-xl font-bold mb-2">Brightness</label>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full"
          />
          <p className="mt-2">Current Brightness: {brightness}%</p>
        </div>

        {/* Checkboxes */}
        <div className="mb-6">
          <label className="block text-xl font-bold mb-4">Options</label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="lights"
                checked={options.lights}
                onChange={handleOptionChange}
                className="form-checkbox"
              />
              <span className="ml-2">Lights</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="sounds"
                checked={options.sounds}
                onChange={handleOptionChange}
                className="form-checkbox"
              />
              <span className="ml-2">Sounds</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="parentalMode"
                checked={options.parentalMode}
                onChange={handleOptionChange}
                className="form-checkbox"
              />
              <span className="ml-2">Parental Mode</span>
            </label>
          </div>
        </div>

        {/* Day and Time Dropdown */}
        <div className="mb-6">
          <label className="block text-xl font-bold mb-2">
            Select Day and Time
          </label>
          <div className="flex space-x-4">
            {/* Day Dropdown */}
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="form-select"
            >
              <option value="">Select Day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>

            {/* Time Dropdown */}
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="form-select"
            >
              <option value="">Select Time</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i}:00`}>
                  {`${i}:00`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Added Terms and Services Button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-4 px-8 rounded text-2xl mt-6"
        >
          Terms and Services
        </button>
      </div>

      {/* Right Half */}
      <div className="w-1/2 p-4">
        <h5 className="text-2xl font-bold mb-4">Background</h5>
        <div className="space-y-4">
          <div
            className="border border-gray-300 p-4 text-center cursor-pointer h-64 flex items-center justify-center"
            onClick={() => {
              /* handle click */
            }}
          >
            Pic of Current Background
          </div>
          <div
            className="border border-gray-300 p-4 text-center cursor-pointer h-16 flex items-center justify-center"
            onClick={() => {
              /* handle click */
            }}
          >
            Add New Picture
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
