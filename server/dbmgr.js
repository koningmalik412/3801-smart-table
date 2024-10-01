const sqlite = require("better-sqlite3");
const db = new sqlite("./tabledb.db");
exports.db = db;
