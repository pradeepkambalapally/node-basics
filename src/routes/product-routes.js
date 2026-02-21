
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct} = require('../controllers/products-controller');
const express = require('express');
const router = express.Router();


router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/addproduct', addProduct);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);
module.exports = router;