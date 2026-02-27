const express = require('express');
const router = express.Router();
const imageMiddleware = require('../middleware/imageMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadImageController } = require('../controllers/image-controller');

router.post('/upload', authMiddleware, imageMiddleware.upload.single('image'), uploadImageController);

module.exports = router;