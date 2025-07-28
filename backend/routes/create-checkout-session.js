const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Your Stripe Secret Key

router.post('/create-checkout-session', async (req, res) => {
  const { userId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: process.env.AIWRITER_PRICE_ID, // 🟨 Set this in .env
          quantity: 1,
        },
      ],
      mode: 'subscription', // use 'payment' for one-time
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId: userId,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('❌ Stripe Checkout Error:', err.message);
    res.status(500).json({ error: 'Stripe session failed' });
  }
});

module.exports = router;
