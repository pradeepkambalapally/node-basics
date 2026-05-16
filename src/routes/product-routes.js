const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/products-controller');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, addProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
