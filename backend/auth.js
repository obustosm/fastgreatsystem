const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('./db'); // Ajusta esto según la configuración de tu base de datos

// Middleware para proteger las rutas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ruta para login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(401).send('User not found');
    
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (result) {
        const user = { name: username };
        const accessToken = jwt.sign(user, 'your_secret_key');
        res.json({ accessToken });
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });
});

module.exports = { router, authenticateToken };
