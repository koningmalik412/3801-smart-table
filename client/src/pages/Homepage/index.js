import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Note,
  CalendarDots,
  Users,
  DotsThreeOutline,
  Checkerboard,
} from "@phosphor-icons/react";

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error:", error));
    fetch("http://localhost:3001/api/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error:", error));
    fetch("http://localhost:3001/api/profiles/1")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="pt-[50px] pl-[50px] pr-[50px] relative">
      <div className="block w-full p-6 bg-brown rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)]">
        <h5 className="text-9xl font-bold text-[#FBF6E3]">COFFEE TABLE</h5>
      </div>
      <div className="flex mt-4">
        <div className="w-4/6 p-4">
          <div className="flex h-[500px] gap-4">
            <Link to="/calendar" className="w-4/6">
              <div className="h-full p-10 w-full rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-lightblue flex flex-col justify-center items-center">
                <h3 className="text-9xl text-brown font-bold ml-7 font-pathway">
                  Calendar
                </h3>
                <CalendarDots
                  size={500}
                  weight="fill"
                  style={{ color: "#60534F" }}
                />
              </div>
            </Link>
            <Link to="/profiles" className="w-2/6">
              <div className="h-full p-9 w-full rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base flex flex-col justify-center items-center">
                <h3 className="text-9xl text-brown font-bold ml-3 font-pathway">
                  Profiles
                </h3>
                <Users size={300} weight="fill" style={{ color: "#60534F" }} />
              </div>
            </Link>
          </div>
          <div className="flex mt-6 gap-4">
            <Link to="/games" className="w-4/6">
              <div className="h-[500px] w-full p-10 rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-pink bg-base flex flex-col justify-center items-center">
                <h3 className="text-9xl font-bold text-brown ml-7 font-pathway">
                  Games
                </h3>
                <Checkerboard
                  size={500}
                  weight="fill"
                  style={{ color: "#60534F" }}
                />
              </div>
            </Link>
            <Link to="/settings" className="w-2/6">
              <div className="h-[500px] w-full p-10 rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base bg-base flex flex-col justify-center items-center">
                <h3 className="text-9xl font-bold text-brown ml-7 font-pathway">
                  Settings
                </h3>
                <DotsThreeOutline
                  size={500}
                  weight="fill"
                  style={{ color: "#60534F" }}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-2/6 p-4">
          <Link to="/community">
            <div className="h-[1000px] w-full p-10 rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-yellow bg-base flex flex-col justify-center items-center">
              <h3 className="text-9xl font-bold text-brown ml-7 font-pathway">
                Event Board
              </h3>
              <Note size={500} weight="fill" style={{ color: "#60534F" }} />
            </div>
          </Link>
        </div>
      </div>
      {/* <div>
        Events
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul>
      </div> */}
      {/* <div>
        Profiles
        <ul>
          {profiles.map((profile_, index) => (
            <li key={index}>{profile_.name}</li>
          ))}
        </ul>
      </div> */}
      {profile.name}
    </div>
  );
};

export default Homepage;
