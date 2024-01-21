
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin = async(req,res,next) =>{
    const {email,password} = req.body;

    try{
        //Kiểm tra user tồn tại trong database
        const validUser = await User.findOne({email});

        if(!validUser){
            return next(errorHandler(404,'Không tìm thấy người dùng'));
        }

        //Vì password đã được hashed dưới database, nên để kiểm tra tính valid của password.
        //Cần sử dụng method .compareSync( ) của bcryptjs
        // method .compareSync( ): check password đã được hashed 
        const validPassword = bcryptjs.compareSync(password,validUser.password);

        if(!validPassword){
            return next(errorHandler(404,'Mật khẩu không hợp lệ!'));
        }

        const token = jwt.sign({id:validUser._id,}, process.env.JWT_SECRET)

        // password: pass - Destruturing : lấyy giá trị password gán vào biến pass
        // ...rest : lấy tất cả các thuộc tính còn lại và gán vào biến rest (có thể đặt tên biến khác, ko nhất thiết phải là res)
        // tham số còn lại aka rest parameters 
        const {password:pass,...rest} = validUser._doc;

        //Save the token as the cookie
        //httpOnly:true có nghĩa là other thỉd party applications can't have access to our cookie
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest); // chỉ trả về rest - các thuộc tính còn lại, mà không trả password của user về => bảo mật tốt hơn. 
    }catch(error){
        next(error);
    }
}
   
