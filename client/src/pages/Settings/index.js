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
    <div className="flex-column pt-[50px] pl-[50px] pr-[50px] h-screen">
      {/* Left Half */}
      <div className="block w-full p-6 bg-brown rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)]">
        <h5 className="text-9xl font-bold text-[#FBF6E3]">SETTINGS</h5>
      </div>
      <div className="flex mt-10 gap-5">
        <div className="w-1/2 p-12 border-4 border-brown rounded-[30px] bg-lightblue">
          {/* Volume Slider */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full mt-6"
            />
            <p className="mt-2 text-xl">Current Volume: {volume}%</p>
          </div>

          {/* Brightness Slider */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">Brightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full mt-6"
            />
            <p className="mt-2 text-xl">Current Brightness: {brightness}%</p>
          </div>

          {/* Checkboxes */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-4">Options</label>
            <div className="flex flex-col space-y-2 mt-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="lights"
                  checked={options.lights}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-xl">Lights</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="sounds"
                  checked={options.sounds}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-xl">Sounds</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="parentalMode"
                  checked={options.parentalMode}
                  onChange={handleOptionChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-xl">Parental Mode</span>
              </label>
            </div>
          </div>

          {/* Day and Time Dropdown */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">
              Select Day and Time
            </label>
            <div className="flex space-x-4 mt-6">
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
          <button className="bg-blue text-white font-bold py-4 px-8 rounded-2xl text-2xl mt-6">
            Terms and Services
          </button>
        </div>

        {/* Right Half */}
        <div className="w-1/2 p-12 border-4 border-brown rounded-[30px] bg-lightblue flex flex-col justify-between">
          <div>
            <p className="text-4xl font-bold mb-4">Background</p>
            <div className="space-y-6 mt-6">
              <div
                className="border-[3px] border-brown bg-base rounded-2xl p-4 text-center text-xl cursor-pointer h-96 flex items-center justify-center"
                onClick={() => {
                  /* handle click */
                }}
              >
                Current Background
              </div>
              <div
                className="bg-blue text-white font-bold rounded-2xl p-4 text-xl text-center cursor-pointer h-16 flex items-center justify-center"
                onClick={() => {
                  /* handle click */
                }}
              >
                Add New Picture
              </div>
            </div>
          </div>

          <button className="bg-blue mx-auto text-white font-bold py-4 px-12 rounded-2xl text-2xl mt-6">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
