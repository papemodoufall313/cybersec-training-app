const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

// Récupérer un exercice spécifique
router.get('/:id', auth, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM exercises WHERE id = $1',
            [req.params.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Exercice non trouvé' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Valider un exercice
router.post('/:id/complete', auth, async (req, res) => {
    try {
        await pool.query(
            `INSERT INTO user_progress (user_id, exercise_id, completed, completed_at) 
             VALUES ($1, $2, true, NOW()) 
             ON CONFLICT (user_id, exercise_id) 
             DO UPDATE SET completed = true, completed_at = NOW()`,
            [req.userId, req.params.id]
        );
        
        res.json({ success: true, message: 'Exercice validé !' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;