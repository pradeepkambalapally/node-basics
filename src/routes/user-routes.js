
const express = require('express');
const router = express.Router();
const {register, Login} = require('../controllers/user-controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', Login);

module.exports = router;