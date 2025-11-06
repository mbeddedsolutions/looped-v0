const express = require("express");
const router = express.Router();

let contacts = [
  { id: 1, name: "John Doe", phone: "+1-555-0100" },
  { id: 2, name: "Jane Smith", phone: "+1-555-0101" },
];

router.get("/", (req, res) => res.json(contacts));

router.post("/", (req, res) => {
  const newContact = { id: Date.now(), ...req.body };
  contacts.push(newContact);
  res.json(newContact);
});

module.exports = router;
