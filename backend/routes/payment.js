const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Créer une session de paiement (abonnement mensuel)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Abonnement Cybersec Training',
            description: 'Accès complet à tous les modules et challenges'
          },
          unit_amount: 1900, // 19€
          recurring: { interval: 'month' }
        },
        quantity: 1
      }],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      client_reference_id: req.userId,
      metadata: { userId: req.userId }
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session' });
  }
});

// Récupérer le statut de l'abonnement
router.get('/subscription-status', async (req, res) => {
  // À compléter avec la base de données
  res.json({ subscribed: true, plan: 'monthly' });
});

module.exports = router;