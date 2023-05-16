const { Router } = require('express');
const router = Router();
const { query } = require('./dbConfig');

// Get user by id:

const getUserByIdDataAccess = async (id) => {
    const { rows } = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return rows.length ? rows[0] : false;
};

const getUserByIdController = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await getUserByIdDataAccess(id);
      if (!result) {
        res.status(404).json({ message: `User with id ${id} not found.` });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

router.get('/:id', getUserByIdController);

module.exports = router; // Exported to: index.js
