
const Product = require('../models/Product');



const getAllProducts = async (req, res) => {

    try{
        const products = await Product.find({});
        res.status(200).json({
        message : "Products retrieved successfully",
        success : true,
        data : products
    }) 
    }catch(e){
        res.status(500).json({
            message : "Failed to retrieve products",
            success : false,
            error : e.message
        })  
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    
    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({
            message : "Product not found",
            success : false
        })
    }
    res.status(200).json({
        message : "Product found",
        success : true,
        data : product
    })
}

const addProduct = async (req, res) => {
    const {title, category, price, inStock} = req.body;

    if (!title || !category || price === undefined || inStock === undefined){
        return res.status(400).json({
            message : "All fields are required",
            success : false
        })
  }
  const newProduct = new Product({
    title,
    category,
    price,
    inStock
  })
  await newProduct.save();
  res.status(201).json({
    message : "Product added successfully",
    success : true,
    data : newProduct
  })
}
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {title, category, price, inStock} = req.body;
    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({
            message : "Product not found",
            success : false
        })
    }
    if (title !== undefined) product.title = title;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (inStock !== undefined) product.inStock = inStock;
    await product.save();
    res.status(200).json({
        message : "Product updated successfully",
        success : true,
        data : product
    })
}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({
            message : "Product not found",
            success : false
        })
    }
    res.status(200).json({
        message : "Product deleted successfully",
        success : true
    })  
}
module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}