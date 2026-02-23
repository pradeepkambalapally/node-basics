const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    try{
        const {username, password} = req.body;

    if(!username || !password){
        return res.status(401).json({
            message : "Username and password are required",
            success : false
        })
    }
    const existingUser = await User.findOne({username});

    if(existingUser){
        return res.status(409).json({
            message : "Username already exists",
            success : false
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password : hashedPassword 
    })

    await newUser.save();

    res.status(201).json({
        message : "User registered successfully",
        success : true,
        data : newUser
    })
    }catch(e){
        res.status(500).json({
            message : "Error registering user",
            success : false,
            error : e.message
        })
    }
}

const Login = async (req, res) => {
    try{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        return res.status(401).json({
            message : "Invalid username or password",
            success : false
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid username or password",
            success : false 
        })  
    }

     const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY,{expiresIn : '1h'}, (err, token) => {
        if(err){
            return res.status(500).json({
                message : "Error generating token",
                success : false
            })
        }
        res.status(200).json({
            message : "Login successful",
            success : true,
            token : token
        })
    })  
    }catch(e){
        res.status(500).json({
            message : "Error logging in",
            success : false,
            error : e.message
        })
    }   
}

module.exports = {
    register,
    Login
}