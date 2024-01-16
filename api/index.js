import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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



