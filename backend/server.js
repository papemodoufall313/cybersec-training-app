require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = require('./db/pool');

const app = express();

// 🔧 Configuration du proxy pour Render
app.set('trust proxy', 1);

// Sécurité
app.use(helmet());
app.use(cors());
app.post('/api/webhook/stripe', express.raw({type: 'application/json'}), webhookRoutes);
app.use(express.json());
// Routes Stripe
app.use('/api/payment', auth, paymentRoutes);
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
// Le webhook Stripe a besoin du body brut

app.use('/api/', limiter);

// Routes
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const exerciseRoutes = require('./routes/exercises');
const challengeRoutes = require('./routes/challenges');
const progressRoutes = require('./routes/progress');
const paymentRoutes = require('./routes/payment');
const webhookRoutes = require('./routes/webhook');
const { requireSubscription } = require('./middleware/subscription');
app.use('/api/auth', authRoutes);
app.use('/api/payment', auth, paymentRoutes);
app.post('/api/webhook/stripe', express.raw({type: 'application/json'}), webhookRoutes);
// Routes protégées (nécessitent authentification + abonnement)
app.use('/api/modules', auth, requireSubscription, moduleRoutes);
app.use('/api/challenges', auth, requireSubscription, challengeRoutes);
app.use('/api/exercises', auth, requireSubscription, exerciseRoutes);
app.use('/api/progress', auth, requireSubscription, progressRoutes);

// Test base de données
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