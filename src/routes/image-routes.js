const express = require('express');
const router = express.Router();
const imageMiddleware = require('../middleware/imageMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadImageController, deleteImageController, fetchImagesController } = require('../controllers/image-controller');

router.post('/upload', authMiddleware, imageMiddleware.upload.single('image'), uploadImageController);
router.delete('/delete/:id', authMiddleware, deleteImageController);
router.get('/fetch', authMiddleware, fetchImagesController);

module.exports = router;