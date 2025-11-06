const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ plan: "Pro Plan", active: true });
});

module.exports = router;
