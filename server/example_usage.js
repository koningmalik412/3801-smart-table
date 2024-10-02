import React, { useState, useEffect } from "react";

const Example = () => {
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
    <div>
      {/* Event List */}
      <div>
        Events
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul>
      </div>

      {/* Profile List */}
      <div>
        Profiles
        <ul>
          {profiles.map((profile_, index) => (
            <li key={index}>{profile_.name}</li>
          ))}
        </ul>
      </div>

      {/* Singular Profile */}
      {profile.name}
    </div>
  );
};
