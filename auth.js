const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { config } = require('./passportConfig');
config(passport);

router.post(
    '/signup',
    passport.authenticate(
        'local-signup',
        {
            failureRedirect: '/auth/signup',
            failureMessage: true //  The failureMessage option will add the message to req.session.messages.
        }
    ),
    (req, res) => {
        res.json({ user: req.user });
        // res.redirect('/auth/login'); // post method?
    }
);

router.post(
    '/login',
    passport.authenticate(
        'local-login',
        {
            failureRedirect: '/auth/login',
            failureMessage: true //  The failureMessage option will add the message to req.session.messages.
        }
    ),
    (req, res) => {
        res.json({ user: req.user });
        // res.redirect('/~' + req.user.user_name);
    }
);

module.exports = router; // Exported to: index.js
