const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const bodyParser = require('body-parser');
const supabase = require('../supabase'); // Or however you connect

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle checkout completion
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const userId = session.metadata.userId;
  const product = session.metadata.product;

  const updates = {};

  if (product === 'mindreset') {
    updates.is_premium = true;
  } else if (product === 'aiwriter') {
    updates.aiwriter_pro = true;
  }

  await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
}


  res.status(200).send('Webhook received');
});

module.exports = router;
