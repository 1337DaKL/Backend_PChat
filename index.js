require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/connectDb');
const userRouter = require('./routes/userRouter');

const app = express();


connectDB();


app.use(express.json());


app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});