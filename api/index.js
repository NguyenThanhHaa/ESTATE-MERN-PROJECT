import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express();

// Đặt cors ở đầu, trước mọi middleware khác
app.use(cors({
    origin: ['https://mern-stack-d85dd.web.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Xử lý preflight request (OPTIONS)
app.options('*', cors());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect MongoDB thành công!")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json());
app.use(cookieParser());

app.listen(3001,()=>{
    console.log('Server đang chạy ở port 3001!')
})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});