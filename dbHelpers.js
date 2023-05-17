const bcrypt = require('bcryptjs');
const { query } = require('./dbConfig');

const userById = async (id) => {
    const { rows } = await query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return rows.length ? rows[0] : false;
}

const emailExists = async (email) => {
    const { rows } = await query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return rows.length ? rows[0] : false;
};

const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Generated hashed password.
    const { rows } = await query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hash]
    );
    return rows.length ? rows[0] : false;
};

const matchPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
    // Returns true or false.
};

module.exports = {
    userById,
    emailExists,
    createUser,
    matchPassword
    // Exported to: passportConfig.js
};
