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

// Alle Vokabeln abrufen
app.get("/vocab", (req, res) => {
  db.all("SELECT * FROM vocab", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Neue Vokabel hinzufügen
app.post("/vocab", (req, res) => {
  const { word, translation, groupName } = req.body;
  const sql =
    "INSERT INTO vocab (word, translation, groupName) VALUES (?, ?, ?)";
  db.run(sql, [word, translation, groupName], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, word, translation, groupName });
  });
});

// Vokabel aktualisieren
app.put("/vocab/:id", (req, res) => {
  const { id } = req.params;
  const { word, translation, groupName } = req.body;
  const sql =
    "UPDATE vocab SET word = ?, translation = ?, groupName = ? WHERE id = ?";
  db.run(sql, [word, translation, groupName, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Vokabel löschen
app.delete("/vocab/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM vocab WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft unter http://localhost:${PORT}`);
});
