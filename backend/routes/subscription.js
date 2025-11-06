const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.get("SELECT * FROM subscription WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

module.exports = router;
