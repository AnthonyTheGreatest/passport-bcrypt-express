const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const store = new session.MemoryStore(); // Storage for session data (for development and testing purposes).
const authRouter = require('./auth');
const userRouter = require('./user');

const port = process.env.PORT || 3001;

// Configure Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Passport middleware
// (req.user; req.isAuthenticated(); req.logout();)
app.use(passport.initialize());
app.use(passport.session());

// Configure express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000000, secure: false },
    store
  }));
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Welcome to the home page.');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`(Ctrl+click =>) http://localhost:${port}`)
});
