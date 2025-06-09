const path = require("path");
const Database = require("better-sqlite3");
const fs = require("fs");

// Function to create and return a database connection
function connectToDatabase() {
  // Create the database directory if it doesn't exist
  const dbDir = path.resolve(__dirname);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "db.sqlite");
  console.log('Database path:', dbPath); // For debugging

  try {
    const db = new Database(dbPath);
    // Enable foreign keys
    db.exec("PRAGMA foreign_keys = ON");
    console.log('Connected to the SQLite database.');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

// Function to close the database connection
function closeDatabase(db) {
  if (db) {
    db.close();
    console.log("Database connection closed.");
  }
}

module.exports = {
  connectToDatabase,
  closeDatabase,
};
