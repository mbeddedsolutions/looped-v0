const express = require("express");
const router = express.Router();

let calls = [
  {
    id: "101",
    phone_id: "1",
    contact_name: "Maddy Dweck",
    duration: "2m 15s",
    call_date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "102",
    phone_id: "1",
    contact_name: "Sim Dim",
    duration: "1m 45s",
    call_date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "103",
    phone_id: "2",
    contact_name: "Buster",
    duration: "3m 20s",
    call_date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

router.get("/", (req, res) => res.json(calls));

module.exports = router;
