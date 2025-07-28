const express = require("express");
const stripeWebhook = require("./routes/stripe-webhook");

const app = express();
app.use('/webhook', stripeWebhook);
