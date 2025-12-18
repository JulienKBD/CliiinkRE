const express = require('express');
const router = express.Router();
const pool = require('../../config/db.js');

// GET - Tous les messages
router.get('/api/contact', (req, res) => {
    const { type, isRead, isArchived } = req.query;
    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];
    
    if (type) { query += ' AND type = ?'; params.push(type); }
    if (isRead !== undefined) { query += ' AND isRead = ?'; params.push(isRead === 'true'); }
    if (isArchived !== undefined) { query += ' AND isArchived = ?'; params.push(isArchived === 'true'); }
    else { query += ' AND isArchived = false'; }
    query += ' ORDER BY createdAt DESC';
    
    pool.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results);
    });
});

// GET - Stats summary
router.get('/api/contact/stats/summary', (req, res) => {
    pool.query(`
        SELECT COUNT(*) as totalMessages,
            SUM(CASE WHEN isRead = false THEN 1 ELSE 0 END) as unreadMessages,
            SUM(CASE WHEN type = 'PARTICULIER' THEN 1 ELSE 0 END) as particulierMessages,
            SUM(CASE WHEN type = 'COMMERCANT' THEN 1 ELSE 0 END) as commercantMessages
        FROM contact_messages WHERE isArchived = false
    `, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(results[0]);
    });
});

// GET - Message par ID
router.get('/api/contact/:id', (req, res) => {
    pool.query('SELECT * FROM contact_messages WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ error: 'Message non trouvé' });
        res.json(results[0]);
    });
});

// POST - Créer message
router.post('/api/contact', (req, res) => {
    const { type, name, email, message, companyName, phone, position, attachmentUrl } = req.body;
    if (!type || !name || !email || !message) {
        return res.status(400).json({ error: 'Champs requis manquants' });
    }
    if (!['PARTICULIER', 'COMMERCANT'].includes(type)) {
        return res.status(400).json({ error: 'Type de contact invalide' });
    }
    
    const id = `message-${Date.now()}`;
    pool.query(
        'INSERT INTO contact_messages (id, type, name, email, message, companyName, phone, position, attachmentUrl, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [id, type, name, email, message, companyName, phone, position, attachmentUrl],
        (err) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            res.status(201).json({ id, message: 'Message envoyé avec succès' });
        }
    );
});

// PUT - Marquer comme lu
router.put('/api/contact/:id/read', (req, res) => {
    pool.query('UPDATE contact_messages SET isRead = true WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Message non trouvé' });
        res.json({ message: 'Message marqué comme lu' });
    });
});

// PUT - Archiver
router.put('/api/contact/:id/archive', (req, res) => {
    pool.query('UPDATE contact_messages SET isArchived = true WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Message non trouvé' });
        res.json({ message: 'Message archivé' });
    });
});

// DELETE - Supprimer message
router.delete('/api/contact/:id', (req, res) => {
    pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Message non trouvé' });
        res.json({ message: 'Message supprimé avec succès' });
    });
});

module.exports = router;
