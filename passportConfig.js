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
            async (email, password, done) => {
                try {
                    const userExists = await helpers.emailExists(email);
                    if (userExists) return done(null, false);
                    const user = await helpers.createUser(email, password);
                    return done(null, user);
                } catch (error) {
                    done(error);
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
            async (email, password, done) => {
                try {
                    const user = await helpers.emailExists(email);
                    if (!user) return done(null, false);
                    const isMatch = await helpers.matchPassword(password, user.password);
                    if (!isMatch) return done(null, false);
                    return done(null, {id: user.id, email: user.email});
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};

module.exports = {
    config
    // Exported to: auth.js
};
