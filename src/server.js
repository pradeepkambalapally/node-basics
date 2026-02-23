require('dotenv').config();
const express = require('express');
const app = express();
const productRoutes = require('./routes/product-routes');
const userRouter = require('./routes/user-routes');
const connectToDB = require('./database/db');

connectToDB();

app.use(express.json());  

app.use('/products', productRoutes);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is now running on ${PORT}`);
    
})