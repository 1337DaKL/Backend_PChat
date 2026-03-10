const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Gọi API: GET /api/users
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;