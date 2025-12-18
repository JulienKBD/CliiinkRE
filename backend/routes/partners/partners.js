const express = require('express');
const router = express.Router();
const pool = require('../../config/db.js');

// GET - Tous les partenaires
router.get('/api/partners', (req, res) => {
    const { category, isFeatured, isActive } = req.query;
    let query = 'SELECT * FROM partners WHERE 1=1';
    const params = [];
    
    if (category) { query += ' AND category = ?'; params.push(category); }
    if (isFeatured !== undefined) { query += ' AND isFeatured = ?'; params.push(isFeatured === 'true'); }
    if (isActive !== undefined) { query += ' AND isActive = ?'; params.push(isActive === 'true'); }
    else { query += ' AND isActive = true'; }
    
    query += ' ORDER BY isFeatured DESC, name';
    
    pool.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        results = results.map(p => ({ ...p, advantages: JSON.parse(p.advantages || '[]') }));
        res.json(results);
    });
});

// GET - Categories list
router.get('/api/partners/categories/list', (req, res) => {
    pool.query('SELECT category, COUNT(*) as count FROM partners WHERE isActive = true GROUP BY category ORDER BY count DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results);
    });
});

// GET - Partenaire par slug
router.get('/api/partners/slug/:slug', (req, res) => {
    pool.query('SELECT * FROM partners WHERE slug = ?', [req.params.slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ error: 'Partenaire non trouvé' });
        res.json({ ...results[0], advantages: JSON.parse(results[0].advantages || '[]') });
    });
});

// GET - Partenaire par ID
router.get('/api/partners/:id', (req, res) => {
    pool.query('SELECT * FROM partners WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ error: 'Partenaire non trouvé' });
        res.json({ ...results[0], advantages: JSON.parse(results[0].advantages || '[]') });
    });
});

// POST - Créer partenaire
router.post('/api/partners', (req, res) => {
    const { name, slug, description, longDescription, category, address, city, zipCode, latitude, longitude, phone, email, website, advantages, pointsRequired, discount } = req.body;
    if (!name || !slug || !category || !address || !city || !zipCode) {
        return res.status(400).json({ error: 'Champs requis manquants' });
    }
    
    const id = `partner-${Date.now()}`;
    pool.query(
        'INSERT INTO partners (id, name, slug, description, longDescription, category, address, city, zipCode, latitude, longitude, phone, email, website, advantages, pointsRequired, discount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [id, name, slug, description, longDescription, category, address, city, zipCode, latitude, longitude, phone, email, website, JSON.stringify(advantages || []), pointsRequired, discount],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Ce slug existe déjà' });
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({ id, message: 'Partenaire créé avec succès' });
        }
    );
});

// PUT - Update partenaire
router.put('/api/partners/:id', (req, res) => {
    const { name, slug, description, longDescription, category, address, city, zipCode, latitude, longitude, phone, email, website, advantages, pointsRequired, discount, isActive, isFeatured } = req.body;
    const advantagesJson = advantages ? JSON.stringify(advantages) : null;
    
    pool.query(
        `UPDATE partners SET name = COALESCE(?, name), slug = COALESCE(?, slug), description = COALESCE(?, description),
         longDescription = COALESCE(?, longDescription), category = COALESCE(?, category), address = COALESCE(?, address),
         city = COALESCE(?, city), zipCode = COALESCE(?, zipCode), latitude = COALESCE(?, latitude), longitude = COALESCE(?, longitude),
         phone = COALESCE(?, phone), email = COALESCE(?, email), website = COALESCE(?, website), advantages = COALESCE(?, advantages),
         pointsRequired = COALESCE(?, pointsRequired), discount = COALESCE(?, discount), isActive = COALESCE(?, isActive),
         isFeatured = COALESCE(?, isFeatured), updatedAt = NOW() WHERE id = ?`,
        [name, slug, description, longDescription, category, address, city, zipCode, latitude, longitude, phone, email, website, advantagesJson, pointsRequired, discount, isActive, isFeatured, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Partenaire non trouvé' });
            res.json({ message: 'Partenaire mis à jour avec succès' });
        }
    );
});

// DELETE - Supprimer partenaire
router.delete('/api/partners/:id', (req, res) => {
    pool.query('DELETE FROM partners WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Partenaire non trouvé' });
        res.json({ message: 'Partenaire supprimé avec succès' });
    });
});

module.exports = router;
