const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { config } = require('./passportConfig');
config(passport);

router.post(
    '/signup',
    passport.authenticate(
        'local-signup',
        { session: false }
    ),
    (req, res) => {
        res.json({ user: req.user });
    }
);

router.post(
    '/login',
    passport.authenticate(
        'local-login',
        { session: false }
    ),
    (req, res) => {
        res.json({ user: req.user });
    }
);

module.exports = router; // Exported to: index.js
