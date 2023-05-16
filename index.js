const express = require('express');
const app = express();
require('dotenv').config();
const userRouter = require('./user');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the home page.');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Ctrl + click => http://localhost:${port}`)
});
