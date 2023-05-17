const LocalStrategy = require('passport-local'); 
const helpers = require('./dbHelpers');

const config = (passport) => {
    // Signup:
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, cb) => {
                try {
                    const userExists = await helpers.emailExists(email);
                    if (userExists) return cb(null, false, { message: 'Email already in use.' });
                    const user = await helpers.createUser(email, password);
                    return cb(null, user);
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
    // Login:
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, cb) => {
                try {
                    const user = await helpers.emailExists(email);
                    if (!user) return cb(null, false, { message: 'Incorrect email.' });
                    const isMatch = await helpers.matchPassword(password, user.password);
                    if (!isMatch) return cb(null, false, { message: 'Incorrect password.' });
                    return cb(null, user);
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
    // Serialization:
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    // Deserialization:
    // (req.user)
    passport.deserializeUser(async (id, cb) => {
        const user = await helpers.userById(id);
        cb(null, user);
    });
};

module.exports = {
    config
    // Exported to: auth.js
};
