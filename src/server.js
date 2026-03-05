require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./routes/product-routes');
const errorMiddleware = require("./middleware/errorMiddleware");
const userRouter = require('./routes/user-routes');
const imageRoutes = require('./routes/image-routes');
const connectToDB = require('./database/db');

connectToDB();

app.use(express.json());  
app.use(errorMiddleware);
app.use('/products', productRoutes);
app.use('/api/users', userRouter);
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is now running on ${PORT}`);
    
})