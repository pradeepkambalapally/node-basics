const express = require('express');
const products = require('../data/Products');



const getAllProducts = (req, res) =>{
    res.json(products);
}

const getProductById = (req, res) =>{
    const id = req.params.id;

    const product = products.find((prod) => prod.id === parseInt(id));

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

const addProduct = (req, res) => {
    const {title, category, price, inStock} = req.body;

    if(!title || !category || !price || inStock === undefined){
        return res.status(400).json({
            message : "All fields are required",
            success : false
        })
  }
  const newProduct = {
    id : products.length + 1,
    title,
    category,
    price,
    inStock
  }
  products.push(newProduct);
  res.status(201).json({
    message : "Product added successfully",
    success : true,
    data : newProduct
  })
}
const updateProduct = (req, res) => {
    const id = req.params.id;
    const {title, category, price, inStock} = req.body;
    const product = products.find((prod) => prod.id === parseInt(id));

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
    res.status(200).json({
        message : "Product updated successfully",
        success : true,
        data : product
    })
}
const deleteProduct = (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex((prod) => prod.id === parseInt(id));
    if(productIndex === -1){
        return res.status(404).json({
            message : "Product not found",
            success : false
        })
    }
    
    products.splice(productIndex, 1);
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