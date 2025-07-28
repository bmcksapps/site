const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ All routes
const aiwriterRoute = require('./routes/create-aiwriter-session');
const checkoutRoute = require('./routes/create-checkout-session');
const webhookRoute = require('./routes/stripe-webhook');

app.use('/api', aiwriterRoute);         // /api/create-aiwriter-session
app.use('/api', checkoutRoute);         // /api/create-checkout-session
app.use('/webhook', webhookRoute);      // /webhook

// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
