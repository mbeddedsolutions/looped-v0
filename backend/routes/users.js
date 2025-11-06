const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  res.json({ id: "local-user-001", name: "Offline Mode User", email: "offline@example.com" });
});

module.exports = router;
