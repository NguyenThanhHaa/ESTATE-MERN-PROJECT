
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req,res)=>{
    const {username,email,password} = req.body

    //Băm password
    const hashedPassword = bcryptjs.hashSync(password,10)

    //Lưu xuống database 
    const newUser = new User({username,email,password:hashedPassword})

    //Bắt lỗi 
    try{
        await newUser.save()
        res.status(201).json("Tạo tài khoản thành công!")
    }catch(error){
        res.status(500).json("Tài khoản đã tồn tại!")
    }
   

}