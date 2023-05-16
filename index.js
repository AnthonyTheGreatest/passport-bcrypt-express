const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const store = new session.MemoryStore();
const authRouter = require('./auth');
const userRouter = require('./user');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
      secret: "f4z4gs$Gcg",
      cookie: { maxAge: 300000000, secure: false },
      saveUninitialized: false,
      resave: false,
      store,
    })
);
// app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());

// Once serializeUser is configured, the user object will be stored in
// Passport’s internal session: req.session.passport.user = {id: 'xyz'}.
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, {
            id: user.id,
            email: user.email,
            password: user.password
        });
    });
});

// The fetched user object is attached to the request object
// as req.user across our whole application (after deserializing).
passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user);
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the home page.');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port} (<= Ctrl+click)`)
});
