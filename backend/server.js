const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const phonesRoute = require("./routes/phones");
const contactsRoute = require("./routes/contacts");
const callsRoute = require("./routes/calls");
const usersRoute = require("./routes/users");
const subscriptionRoute = require("./routes/subscription");

app.use("/api/phones", phonesRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/calls", callsRoute);
app.use("/api/users", usersRoute);
app.use("/api/subscription", subscriptionRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
