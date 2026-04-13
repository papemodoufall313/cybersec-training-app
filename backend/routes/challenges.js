const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

// Récupérer tous les challenges
router.get('/', auth, async (req, res) => {
    try {
        const challenges = await pool.query(
            'SELECT id, title, description, category, difficulty, points FROM challenges ORDER BY difficulty'
        );
        
        // Récupérer ceux déjà validés
        const validated = await pool.query(
            'SELECT challenge_id FROM user_flags WHERE user_id = $1',
            [req.userId]
        );
        
        const validatedIds = validated.rows.map(v => v.challenge_id);
        
        res.json({
            challenges: challenges.rows,
            validated: validatedIds
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Valider un flag
router.post('/:id/validate', auth, async (req, res) => {
    const { flag } = req.body;
    
    if (!flag) {
        return res.status(400).json({ error: 'Flag requis' });
    }
    
    try {
        const challenge = await pool.query(
            'SELECT flag, points FROM challenges WHERE id = $1',
            [req.params.id]
        );
        
        if (challenge.rows.length === 0) {
            return res.status(404).json({ error: 'Challenge non trouvé' });
        }
        
        // Vérifier si déjà validé
        const alreadyValidated = await pool.query(
            'SELECT id FROM user_flags WHERE user_id = $1 AND challenge_id = $2',
            [req.userId, req.params.id]
        );
        
        if (alreadyValidated.rows.length > 0) {
            return res.status(400).json({ error: 'Challenge déjà validé' });
        }
        
        if (flag === challenge.rows[0].flag) {
            await pool.query(
                'INSERT INTO user_flags (user_id, challenge_id) VALUES ($1, $2)',
                [req.userId, req.params.id]
            );
            
            res.json({ 
                success: true, 
                message: 'Flag validé !',
                points: challenge.rows[0].points
            });
        } else {
            res.status(400).json({ error: 'Flag incorrect' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;