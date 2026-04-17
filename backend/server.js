require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = require('./db/pool');

// Importer TOUTES les routes et middlewares
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const exerciseRoutes = require('./routes/exercises');
const challengeRoutes = require('./routes/challenges');
const progressRoutes = require('./routes/progress');
const paymentRoutes = require('./routes/payment');
const webhookRoutes = require('./routes/webhook');
const { requireSubscription } = require('./middleware/subscription');

const app = express();

// Configuration du proxy pour Render
app.set('trust proxy', 1);

// Webhook Stripe (body brut) AVANT express.json()
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), webhookRoutes);

// Middleware standard
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes Stripe (authentification requise)
app.use('/api/payment', authRoutes, paymentRoutes);

// Routes protégées par authentification uniquement
app.use('/api/challenges', authRoutes, challengeRoutes);

// Routes protégées par authentification + abonnement
app.use('/api/modules', authRoutes, requireSubscription, moduleRoutes);
app.use('/api/exercises', authRoutes, requireSubscription, exerciseRoutes);
app.use('/api/progress', authRoutes, requireSubscription, progressRoutes);

// Health check (public)
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'OK', database: 'connected' });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ status: 'ERROR', database: 'disconnected' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});