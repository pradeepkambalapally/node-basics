require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/product-routes');
const errorMiddleware = require("./middleware/errorMiddleware");
const userRouter = require('./routes/user-routes');
const imageRoutes = require('./routes/image-routes');
const connectToDB = require('./database/db');

connectToDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRouter);
app.use('/api/images', imageRoutes);

// Error middleware must be LAST
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is now running on ${PORT}`);
});
