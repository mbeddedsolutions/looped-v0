const express = require("express");
const router = express.Router();

let phones = [
  { id: "1", name: "Home Phone" },
  { id: "2", name: "Office Line" },
  { id: "3", name: "Jared's Phone"},
   { id: "4", name: "Jack's Phone"},
];

router.get("/", (req, res) => res.json(phones));

module.exports = router;
