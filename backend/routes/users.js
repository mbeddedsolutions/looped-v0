const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/me", (req, res) => {
  db.get("SELECT * FROM users WHERE id = ?", ["local-user-001"], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

module.exports = router;
