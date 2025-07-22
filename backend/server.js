const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("❌ Datenbankfehler:", err.message);
  console.log("✅ Verbindung zur SQLite-Datenbank hergestellt.");
});

// Datenbank initialisieren
const initSQLs = [
  `
  CREATE TABLE IF NOT EXISTS vocab (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original TEXT NOT NULL,
    translation TEXT NOT NULL,
    groupName TEXT
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS buckets (
    bucketName TEXT PRIMARY KEY NOT NULL
  );
  `,
];

initSQLs.forEach((sql) => {
  db.run(sql, (err) => {
    if (err)
      console.error("❌ Fehler beim Initialisieren der Tabelle:", err.message);
  });
});

// === REST-API ===

// get all vocabulary
app.get("/vocab", (req, res) => {
  db.all("SELECT * FROM vocab", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// get all vocabulary from bucket
app.get("/vocab/:bucketName", (req, res) => {
  const { bucketName } = req.params;
  db.all(
    "SELECT * FROM vocab WHERE groupName = ?",
    [bucketName],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// get all buckets
app.get("/buckets", (req, res) => {
  db.all("SELECT * FROM buckets", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// add new vocabulary to bucket
app.post("/vocab", (req, res) => {
  const { original, translation, bucketName } = req.body;
  const sql =
    "INSERT INTO vocab (original, translation, groupName) VALUES (?, ?, ?)";
  db.run(sql, [original, translation, bucketName], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, original, translation, bucketName });
  });
});

// add new bucket
app.post("/buckets", (req, res) => {
  const { bucketName } = req.body;
  const sql = "INSERT INTO buckets (bucketName) VALUES (?)";
  db.run(sql, [bucketName], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ bucketName });
  });
});

// edit vocabulary
app.put("/vocab/:id", (req, res) => {
  const { id } = req.params;
  const { word, translation, bucketName } = req.body;
  const sql =
    "UPDATE vocab SET word = ?, translation = ?, bucketName = ? WHERE id = ?";
  db.run(sql, [word, translation, bucketName, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// delete vocabulary
app.delete("/vocab/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM vocab WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// delete bucket
app.delete("/buckets/:bucketName", (req, res) => {
  const { bucketName } = req.params;
  const sql = "DELETE FROM buckets WHERE bucketName = ?";
  db.run(sql, [bucketName], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server läuft unter http://localhost:${PORT}`);
});
