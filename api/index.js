import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect MongoDB thành công!")
}).catch((err)=>{
    console.log(err)
})

const app = express();

app.listen(3001,()=>{
    console.log('Server đang chạy ở port 3001!')
})

app.use("/api/user",userRouter)


