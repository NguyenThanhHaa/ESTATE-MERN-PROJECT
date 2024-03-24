
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body

    //Kiểm tra user tồn tại trong database
    const validEmail = await User.findOne({email});
    const validUserName = await User.findOne({username});

    if(validEmail){
        return next(errorHandler(400,'Tài khoản đã tồn tại!!!!'));
    }

    if(validUserName){
        return next(errorHandler(400,'Tài khoản đã tồn tại!!!!'));
    }

    const validPassword = password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

    if(!validPassword){
        return next(errorHandler(404,'Mật khẩu cần tối thiểu 8 ký tự, ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({username,email,password:hashedPassword})
    try{
        await newUser.save();
        res.status(201).json('Tạo tài khoản thành công!');
    }catch(error){
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
        // method .compareSync( ): so sánh password với password đã được hashed 
        const validPassword = bcryptjs.compareSync(password,validUser.password);

        if(!validPassword){
            return next(errorHandler(404,'Mật khẩu không hợp lệ!'));
        }

        const token = jwt.sign({id:validUser._id,}, process.env.JWT_SECRET)

        // password: pass - Destructuring : lấyy giá trị password gán vào biến pass
        // ...rest : lấy tất cả các thuộc tính còn lại và gán vào biến rest (có thể đặt tên biến khác, ko nhất thiết phải là res)
        // tham số còn lại aka rest parameters 
        const {password:pass,...rest} = validUser._doc;

        //Save the token as the cookie
        //httpOnly:true có nghĩa là other third party applications can't have access to our cookie
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest); // chỉ trả về rest - các thuộc tính còn lại, mà không trả password của user về => bảo mật tốt hơn. 
    }catch(error){
        next(error);
    }
}

export const google = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.body.email});
        //Nếu user có tồn tại 
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password: pass,...rest} = user._doc;

            res 
                .cookie('access_token',token,{httpOnly:true})
                .status(200)
                .json(rest);
        }else{
            //Generate password của user vì user sign in = google nên k cần fetch password của user. Và vì yêu cầu có password là bắt buộc để save xuống db.
            // => Chỉ cần tạo 1 random password. Nếu user k thích thì có thể update password sau. 
            const generatedPassword = Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name, email:req.body.email, password:hashedPassword, avatar:req.body.photoURL});

            await newUser.save();
            
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
              .cookie('access_token', token, { httpOnly: true })
              .status(200)
              .json(rest);
        }
    }catch(error){
        next(error)
    }
}
   
