const { Router } = require('express');
const router = Router();
const { query } = require('./dbConfig');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/auth/login');
};

// TODO: Insert user_name for registered users.

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the dashboard."});
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router; // Exported to: index.js
