const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

// Récupérer tous les modules
router.get('/', auth, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM modules ORDER BY order_position'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer un module avec ses exercices
router.get('/:id', auth, async (req, res) => {
    try {
        const moduleResult = await pool.query(
            'SELECT * FROM modules WHERE id = $1',
            [req.params.id]
        );
        
        if (moduleResult.rows.length === 0) {
            return res.status(404).json({ error: 'Module non trouvé' });
        }
        
        const exercisesResult = await pool.query(
            'SELECT * FROM exercises WHERE module_id = $1 ORDER BY order_position',
            [req.params.id]
        );
        
        // Récupérer la progression de l'utilisateur
        const progressResult = await pool.query(
            `SELECT exercise_id, completed FROM user_progress 
             WHERE user_id = $1 AND exercise_id IN (SELECT id FROM exercises WHERE module_id = $2)`,
            [req.userId, req.params.id]
        );
        
        const progress = {};
        progressResult.rows.forEach(p => {
            progress[p.exercise_id] = p.completed;
        });
        
        res.json({
            module: moduleResult.rows[0],
            exercises: exercisesResult.rows,
            progress
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;