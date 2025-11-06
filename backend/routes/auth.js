const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  res.json({ id: "local-user-001", name: "Offline Mode User", email: "offline@example.com" });
});

router.post('/signin', (req, res) => {
  res.json({ message: "Local sign-in (mock)" });
});

router.post('/signout', (req, res) => {
  res.json({ message: "Local sign-out (mock)" });
});

module.exports = router;
