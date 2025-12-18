const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db.js');

// POST - Login
router.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
        
        const user = results[0];
        
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
            
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role, name: user.name },
                process.env.SECRET || 'cliiink-secret-key',
                { expiresIn: '24h' }
            );
            
            res.json({
                token,
                user: { id: user.id, email: user.email, name: user.name, role: user.role }
            });
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
    });
});

// POST - Register
router.post('/api/auth/register', async (req, res) => {
    const { email, password, name, role } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    pool.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }
        
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const id = `user-${Date.now()}`;
            
            pool.query(
                'INSERT INTO users (id, email, password, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [id, email, hashedPassword, name, role || 'EDITOR'],
                (err) => {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({ error: 'Erreur serveur' });
                    }
                    res.status(201).json({ id, message: 'Utilisateur créé avec succès' });
                }
            );
        } catch (error) {
            console.error('Error hashing password:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
    });
});

// GET - Me
router.get('/api/auth/me', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token non fourni' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET || 'cliiink-secret-key');
        
        pool.query('SELECT id, email, name, role FROM users WHERE id = ?', [decoded.id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
            res.json(results[0]);
        });
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    }
});

// PUT - Password
router.put('/api/auth/password', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const { currentPassword, newPassword } = req.body;
    
    if (!token) return res.status(401).json({ error: 'Token non fourni' });
    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Mot de passe actuel et nouveau requis' });
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET || 'cliiink-secret-key');
        
        pool.query('SELECT password FROM users WHERE id = ?', [decoded.id], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Erreur serveur' });
            if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
            
            const isMatch = await bcrypt.compare(currentPassword, results[0].password);
            if (!isMatch) return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
            
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            pool.query('UPDATE users SET password = ?, updatedAt = NOW() WHERE id = ?', [hashedPassword, decoded.id], (err) => {
                if (err) return res.status(500).json({ error: 'Erreur serveur' });
                res.json({ message: 'Mot de passe mis à jour avec succès' });
            });
        });
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    }
});

module.exports = router;
