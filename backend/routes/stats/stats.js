const express = require('express');
const router = express.Router();
const pool = require('../../config/db.js');

// GET - Stats globales
router.get('/api/stats', (req, res) => {
    const results = {};
    
    pool.query('SELECT COUNT(*) as count FROM bornes WHERE isActive = true', (err, bornes) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        results.totalBornes = bornes[0].count;
        
        pool.query('SELECT COUNT(*) as count FROM partners WHERE isActive = true', (err, partners) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            results.totalPartners = partners[0].count;
            
            pool.query('SELECT COUNT(*) as count FROM articles WHERE isPublished = true', (err, articles) => {
                if (err) return res.status(500).json({ error: 'Erreur serveur' });
                results.totalArticles = articles[0].count;
                
                pool.query('SELECT `key`, value FROM site_config WHERE `key` IN ("total_glass_collected", "total_users")', (err, config) => {
                    if (err) return res.status(500).json({ error: 'Erreur serveur' });
                    config.forEach(item => {
                        if (item.key === 'total_glass_collected') results.totalGlassCollected = parseFloat(item.value);
                        else if (item.key === 'total_users') results.totalUsers = parseInt(item.value);
                    });
                    res.json(results);
                });
            });
        });
    });
});

// GET - Stats mensuelles
router.get('/api/stats/monthly', (req, res) => {
    const { year } = req.query;
    let query = 'SELECT * FROM statistics';
    const params = [];
    
    if (year) { query += ' WHERE year = ?'; params.push(parseInt(year)); }
    query += ' ORDER BY year DESC, month DESC LIMIT 12';
    
    pool.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results);
    });
});

// GET - Stats par ville
router.get('/api/stats/by-city', (req, res) => {
    pool.query(`
        SELECT city, COUNT(*) as totalBornes, SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) as activeBornes
        FROM bornes WHERE isActive = true GROUP BY city ORDER BY totalBornes DESC
    `, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results);
    });
});

// POST - Ajouter stats mensuelles
router.post('/api/stats/monthly', (req, res) => {
    const { year, month, totalGlassCollected, totalPoints, totalUsers, totalPartners } = req.body;
    if (!year || !month) return res.status(400).json({ error: 'Année et mois requis' });
    
    const id = `stats-${year}-${month}`;
    pool.query(
        `INSERT INTO statistics (id, year, month, totalGlassCollected, totalPoints, totalUsers, totalPartners, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE
         totalGlassCollected = VALUES(totalGlassCollected), totalPoints = VALUES(totalPoints),
         totalUsers = VALUES(totalUsers), totalPartners = VALUES(totalPartners)`,
        [id, year, month, totalGlassCollected || 0, totalPoints || 0, totalUsers || 0, totalPartners || 0],
        (err) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            res.status(201).json({ message: 'Statistiques enregistrées avec succès' });
        }
    );
});

module.exports = router;
