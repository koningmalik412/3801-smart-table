const dbmgr = require("./dbmgr");
const db = dbmgr.db;

exports.getEvents = () => {
  const sql = "SELECT * FROM Events";
  let stmt = db.prepare(sql);
  let res = stmt.all();
  return res;
};

exports.getEventById = (id) => {
  const sql = "SELECT * FROM Events WHERE id = ?";
  let stmt = db.prepare(sql);
  let res = stmt.get(id);
  return res;
};

exports.createEvent = (event) => {
  const sql =
    "INSERT INTO Events (title, description, is_all_day, start_time, end_time, location, is_clash) VALUES (?, ?, ?, ?, ?)";
  let stmt = db.prepare(sql);
  let result = stmt.run(
    event.title,
    event.description,
    event.is_all_day,
    event.start_time,
    event.end_time,
    event.location,
    event.is_clash
  );
  return result;
};

exports.updateEvent = (id, event) => {
  const sql =
    "UPDATE Events SET title = ?, description = ?, is_all_day = ?, start_time = ?, end_time = ?, location = ?, is_clash = ? WHERE id = ?";
  let stmt = db.prepare(sql);
  let result = stmt.run(
    event.title,
    event.description,
    event.is_all_day,
    event.start_time,
    event.end_time,
    event.location,
    event.is_clash,
    id
  );
  return result;
};

exports.deleteEvent = (id) => {
  const sql = "DELETE FROM Events WHERE id = ?";
  let stmt = db.prepare(sql);
  let result = stmt.run(id);
  return result;
};

exports.getProfiles = () => {
  const sql = "SELECT * FROM Profiles";
  let stmt = db.prepare(sql);
  let res = stmt.all();
  return res;
};

exports.getProfileById = (id) => {
  const sql = "SELECT * FROM Profiles WHERE id = ?";
  let stmt = db.prepare(sql);
  let res = stmt.get(id);
  return res;
};

exports.createProfile = (profile) => {
  const sql =
    "INSERT INTO Profiles (name, fullName, role, dob, image) VALUES (?, ?, ?, ?, ?)";
  let stmt = db.prepare(sql);
  let result = stmt.run(
    profile.name,
    profile.fullName,
    profile.role,
    profile.dob,
    profile.image
  );
  return result;
};

exports.updateProfile = (id, profile) => {
  const sql =
    "UPDATE Profiles SET name = ?, fullName = ?, role = ?, dob = ?, image = ? WHERE id = ?";
  let stmt = db.prepare(sql);
  let result = stmt.run(
    profile.name,
    profile.fullName,
    profile.role,
    profile.dob,
    profile.image,
    id
  );
  return result;
};

exports.deleteProfile = (id) => {
  const sql = "DELETE FROM Profiles WHERE id = ?";
  let stmt = db.prepare(sql);
  let result = stmt.run(id);
  return result;
};
