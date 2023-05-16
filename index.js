const express = require('express');
const app = express();
require('dotenv').config();
const authRouter = require('./auth');
const userRouter = require('./user');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the home page.');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port} (<= Ctrl+click)`)
});
