
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

// Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
const validatePasword = (password) => {
    return password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
  };

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body

    // if (!validatePasword(req.body.password)) {
    //     return res.status(400).json("Mật khẩu không hợp lệ!")
    // }

    //Băm password
    const hashedPassword = bcryptjs.hashSync(password,10)

    //Lưu xuống database 
    const newUser = new User({username,email,password:hashedPassword})

    //Bắt lỗi 
    try {
        // Save user to database
        await newUser.save();
        res.status(201).json("Tạo tài khoản thành công!");
    } catch (error) {
        // // Handle specific errors
        // if (error.code === 11000) { // Duplicate key (MongoDB)
        //     res.status(409).json("Tài khoản đã tồn tại!!!");
        // } else {
        //     // Handle other errors
        //     res.status(500).json("Đã có lỗi xảy ra khi tạo tài khoản!");
        // }

        next(error);
    }
};
   
