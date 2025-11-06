const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM calls", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { phone_id, contact_name, duration, call_date } = req.body;
  db.run(
    "INSERT INTO calls(phone_id, contact_name, duration, call_date) VALUES(?, ?, ?, ?)",
    [phone_id, contact_name, duration, call_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, phone_id, contact_name, duration, call_date });
    }
  );
});

module.exports = router;
