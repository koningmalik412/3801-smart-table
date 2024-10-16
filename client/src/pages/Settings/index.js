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
            <p className="mt-2 text-2xl">Current Volume: {volume}%</p>
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
            <p className="mt-2 text-2xl">Current Brightness: {brightness}%</p>
          </div>

          {/* Checkboxes */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-4">Options</label>
            <div className="flex flex-col space-y-2 mt-6">
              {["lights", "sounds", "parentalMode"].map((option) => (
                <label className="inline-flex items-center" key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={options[option]}
                    onChange={handleOptionChange}
                    className="custom-checkbox"
                    style={{ transform: 'scale(2.5)', marginRight: '20px' }}
                  />
                  <span className="text-2xl">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Day and Time Dropdown */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">Select Day and Time</label>
            <div className="flex space-x-4 mt-6 text-2xl">
              {/* Day Dropdown */}
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="form-select"
                style={{ height: '50px', width: '250px', fontSize: '25px', padding: '10px', borderRadius: '15px' }}
              >
                <option value="">Select Day</option>
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              {/* Time Dropdown */}
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="form-select"
                style={{ height: '50px', width: '250px', fontSize: '25px', padding: '10px', borderRadius: '15px' }}
              >
                <option value="">Select Time</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>


        <div className="w-1/2 p-12 border-4 border-brown rounded-[30px] bg-lightblue flex flex-col justify-between">
          <div className="mt-5"> 
            <p className="text-4xl font-bold mb-14">Background (On Standby)</p>
            <div className="space-y-6">
              <div
                className="border-[3px] border-brown bg-base rounded-3xl p-4 text-center text-2xl cursor-pointer h-96 flex items-center justify-center"
                onClick={() => {
          
                }}
              >
                Current Background
              </div>
              <div
                className="bg-brown text-white font-bold rounded-2xl p-4 text-2xl text-center cursor-pointer h-16 flex items-center justify-center"
                onClick={() => {
         
                }}
              >
                Add a New Background Image
              </div>
            </div>
          </div>
          

          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-blue text-white font-bold py-4 px-8 rounded-2xl text-2xl">
              Terms and Services
            </button>
            <button className="bg-blue text-white font-bold py-4 px-12 rounded-2xl text-2xl">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
