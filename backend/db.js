const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database path
const dbPath = path.join(__dirname, "data", "looped.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite database.");
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS phones (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)`);
  db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT, phone_id INTEGER, contact_name TEXT, duration TEXT, call_date TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY, plan TEXT, active INTEGER)`);
});

// Seed data if tables are empty
function seedData() {
  // Phones
  db.get("SELECT COUNT(*) as count FROM phones", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO phones(name) VALUES(?)", ["Home Phone"]);
      db.run("INSERT INTO phones(name) VALUES(?)", ["Office Line"]);
      console.log("✅ Phones table seeded");
    }
  });

  // Contacts
  db.get("SELECT COUNT(*) as count FROM contacts", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO contacts(name, phone) VALUES(?, ?)", ["John Doe", "+1-555-0100"]);
      db.run("INSERT INTO contacts(name, phone) VALUES(?, ?)", ["Jane Smith", "+1-555-0101"]);
      console.log("✅ Contacts table seeded");
    }
  });

  // Calls
  db.get("SELECT COUNT(*) as count FROM calls", (err, row) => {
    if (row.count === 0) {
      const now = new Date().toISOString();
      db.run("INSERT INTO calls(phone_id, contact_name, duration, call_date) VALUES(?, ?, ?, ?)", [1, "Maddy Dweck", "2m 15s", now]);
      db.run("INSERT INTO calls(phone_id, contact_name, duration, call_date) VALUES(?, ?, ?, ?)", [1, "Sim DAWG", "1m 45s", now]);
      console.log("✅ Calls table seeded");
    }
  });

  // Users
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO users(id, name, email) VALUES(?, ?, ?)", ["local-user-001", "Offline Mode User", "offline@example.com"]);
      console.log("✅ Users table seeded");
    }
  });

  // Subscription
  db.get("SELECT COUNT(*) as count FROM subscription", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO subscription(id, plan, active) VALUES(?, ?, ?)", [1, "Local Offline Mode", 1]);
      console.log("✅ Subscription table seeded");
    }
  });
}

seedData();

module.exports = db;
