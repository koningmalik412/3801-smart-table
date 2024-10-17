const express = require("express");
const tablemgr = require("./tablemgr"); // Import the table manager with database queries
const app = express();
const PORT = 3001;

const cors = require("cors");
app.use(cors());

// Middleware to allow JSON responses and CORS for frontend
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (for local dev)
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.get("/api/events", (req, res) => {
  try {
    const events = tablemgr.getEvents(); // Get events using your table manager
    res.json(events); // Send the events as JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});

app.get("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  try {
    const event = tablemgr.getEventById(eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event" });
  }
});

app.post("/api/events", (req, res) => {
  const newEvent = req.body;
  try {
    const result = tablemgr.createEvent(newEvent);
    res.status(201).json({
      message: "Event created successfully",
      eventId: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.put("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  const updatedEvent = req.body;
  try {
    const changes = tablemgr.updateEvent(eventId, updatedEvent);
    if (changes.changes > 0) {
      res.json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

app.delete("/api/events/:id", (req, res) => {
  const eventId = req.params.id;
  try {
    const changes = tablemgr.deleteEvent(eventId);
    if (changes.changes > 0) {
      res.json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

app.get("/api/profiles", (req, res) => {
  try {
    const profiles = tablemgr.getProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});

app.get("/api/profiles/:id", (req, res) => {
  const profileId = req.params.id;
  try {
    const profile = tablemgr.getProfileById(profileId);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
});

app.post("/api/profiles", (req, res) => {
  const newProfile = req.body;
  try {
    const result = tablemgr.createProfile(newProfile);
    res.status(201).json({
      message: "Profile created successfully",
      profileId: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create profile" });
  }
});

app.put("/api/profiles/:id", (req, res) => {
  const profileId = req.params.id;
  const updatedProfile = req.body;
  try {
    const changes = tablemgr.updateProfile(profileId, updatedProfile);
    if (changes.changes > 0) {
      res.json({ message: "Profile updated successfully" });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.delete("/api/profiles/:id", (req, res) => {
  const profileId = req.params.id;
  try {
    const changes = tablemgr.deleteProfile(profileId);
    if (changes.changes > 0) {
      res.json({ message: "Profile deleted successfully" });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
