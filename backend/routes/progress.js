const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

// Statistiques de progression
router.get('/stats', auth, async (req, res) => {
    try {
        // Total exercices
        const totalExercises = await pool.query('SELECT COUNT(*) FROM exercises');
        
        // Exercices complétés
        const completedExercises = await pool.query(
            'SELECT COUNT(*) FROM user_progress WHERE user_id = $1 AND completed = true',
            [req.userId]
        );
        
        // Total points challenges
        const totalPoints = await pool.query('SELECT SUM(points) FROM challenges');
        
        // Points gagnés
        const earnedPoints = await pool.query(
            `SELECT COALESCE(SUM(c.points), 0) as total 
             FROM user_flags uf 
             JOIN challenges c ON uf.challenge_id = c.id 
             WHERE uf.user_id = $1`,
            [req.userId]
        );
        
        res.json({
            total_exercises: parseInt(totalExercises.rows[0].count),
            completed_exercises: parseInt(completedExercises.rows[0].count),
            total_points: parseInt(totalPoints.rows[0].sum) || 0,
            earned_points: parseInt(earnedPoints.rows[0].total),
            completion_rate: Math.round((completedExercises.rows[0].count / totalExercises.rows[0].count) * 100)
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;