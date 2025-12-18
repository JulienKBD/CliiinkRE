const express = require('express');
const router = express.Router();
const pool = require('../../config/db.js');

// GET - Tous les articles publiés
router.get('/api/articles', (req, res) => {
    const { category, isFeatured, limit } = req.query;
    let query = 'SELECT a.*, u.name as authorName FROM articles a LEFT JOIN users u ON a.authorId = u.id WHERE a.isPublished = true';
    const params = [];
    
    if (category) { query += ' AND a.category = ?'; params.push(category); }
    if (isFeatured !== undefined) { query += ' AND a.isFeatured = ?'; params.push(isFeatured === 'true'); }
    query += ' ORDER BY a.publishedAt DESC';
    if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)); }
    
    pool.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        results = results.map(a => ({ ...a, tags: JSON.parse(a.tags || '[]') }));
        res.json(results);
    });
});

// GET - Admin all
router.get('/api/articles/admin/all', (req, res) => {
    pool.query('SELECT a.*, u.name as authorName FROM articles a LEFT JOIN users u ON a.authorId = u.id ORDER BY a.createdAt DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        results = results.map(a => ({ ...a, tags: JSON.parse(a.tags || '[]') }));
        res.json(results);
    });
});

// GET - Categories list
router.get('/api/articles/categories/list', (req, res) => {
    pool.query('SELECT category, COUNT(*) as count FROM articles WHERE isPublished = true GROUP BY category ORDER BY count DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results);
    });
});

// GET - Article par slug
router.get('/api/articles/slug/:slug', (req, res) => {
    pool.query('SELECT a.*, u.name as authorName FROM articles a LEFT JOIN users u ON a.authorId = u.id WHERE a.slug = ?', [req.params.slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ error: 'Article non trouvé' });
        pool.query('UPDATE articles SET views = views + 1 WHERE slug = ?', [req.params.slug]);
        res.json({ ...results[0], tags: JSON.parse(results[0].tags || '[]') });
    });
});

// GET - Article par ID
router.get('/api/articles/:id', (req, res) => {
    pool.query('SELECT a.*, u.name as authorName FROM articles a LEFT JOIN users u ON a.authorId = u.id WHERE a.id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ error: 'Article non trouvé' });
        res.json({ ...results[0], tags: JSON.parse(results[0].tags || '[]') });
    });
});

// POST - Créer article
router.post('/api/articles', (req, res) => {
    const { title, slug, excerpt, content, category, tags, imageUrl, isPublished, isFeatured, authorId } = req.body;
    if (!title || !slug || !content || !category || !authorId) {
        return res.status(400).json({ error: 'Champs requis manquants' });
    }
    
    const id = `article-${Date.now()}`;
    const publishedAt = isPublished ? new Date() : null;
    
    pool.query(
        'INSERT INTO articles (id, title, slug, excerpt, content, category, tags, imageUrl, isPublished, isFeatured, publishedAt, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [id, title, slug, excerpt, content, category, JSON.stringify(tags || []), imageUrl, isPublished || false, isFeatured || false, publishedAt, authorId],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Ce slug existe déjà' });
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({ id, message: 'Article créé avec succès' });
        }
    );
});

// PUT - Update article
router.put('/api/articles/:id', (req, res) => {
    const { title, slug, excerpt, content, category, tags, imageUrl, isPublished, isFeatured } = req.body;
    const tagsJson = tags ? JSON.stringify(tags) : null;
    let publishedAtUpdate = isPublished ? ', publishedAt = COALESCE(publishedAt, NOW())' : '';
    
    pool.query(
        `UPDATE articles SET title = COALESCE(?, title), slug = COALESCE(?, slug), excerpt = COALESCE(?, excerpt),
         content = COALESCE(?, content), category = COALESCE(?, category), tags = COALESCE(?, tags),
         imageUrl = COALESCE(?, imageUrl), isPublished = COALESCE(?, isPublished), isFeatured = COALESCE(?, isFeatured),
         updatedAt = NOW()${publishedAtUpdate} WHERE id = ?`,
        [title, slug, excerpt, content, category, tagsJson, imageUrl, isPublished, isFeatured, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Article non trouvé' });
            res.json({ message: 'Article mis à jour avec succès' });
        }
    );
});

// DELETE - Supprimer article
router.delete('/api/articles/:id', (req, res) => {
    pool.query('DELETE FROM articles WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Article non trouvé' });
        res.json({ message: 'Article supprimé avec succès' });
    });
});

module.exports = router;
