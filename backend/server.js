const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Existing routes
const contactsRoute = require('./routes/contacts');
const phonesRoute = require('./routes/phones');
const callsRoute = require('./routes/calls');

// New routes
const subscriptionRoute = require('./routes/subscription');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

app.use('/api/contacts', contactsRoute);
app.use('/api/phones', phonesRoute);
app.use('/api/calls', callsRoute);
app.use('/api/subscription', subscriptionRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
