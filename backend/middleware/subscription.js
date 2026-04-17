const pool = require('../db/pool');

const requireSubscription = async (req, res, next) => {
  try {
    const userId = req.userId;
    
    const result = await pool.query(
      'SELECT subscription_status FROM users WHERE id = $1',
      [userId]
    );
    
    const status = result.rows[0]?.subscription_status;
    
    if (status !== 'active') {
      return res.status(403).json({ 
        error: 'Abonnement requis. Veuillez vous abonner pour accéder à ce contenu.',
        code: 'SUBSCRIPTION_REQUIRED'
      });
    }
    
    next();
  } catch (error) {
    console.error('Erreur middleware subscription:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { requireSubscription };