
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

const authMiddleware = asyncHandler((req, res, next) => {
    
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }

    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    
});

module.exports = authMiddleware;