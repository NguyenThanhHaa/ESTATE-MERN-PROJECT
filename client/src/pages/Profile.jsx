import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import Tooltip from '@mui/material/Tooltip';

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)

  const [formData,setFormData] = useState({});

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };


  //Handle các giá trị do người dùng nhập vào các trường dữ liệu 
  const handleOnChange= (e) => {
    //Sử dụng method setFormData để update các state của formData 
    setFormData(
      {
        ...formData,//Copy các properties của formData bằng cách sử dụng operator spread ... vào 1 formData mới 
        [e.target.id]: e.target.value
        // e.target.id: trường nhập liệu được truyền qua từ onChange 
        // e.target.value: giá trị người dùng đã nhập
        // id nào thì value đó  
      }
    )
  }
  console.log(formData)

  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-7'>Profile</h1>

      <form className="mx-auto flex flex-col gap-6 ">
      <Tooltip title="Tải ảnh mới" placement="right-end">
      <div className="flex relative mx-auto ">
        <img src={currentUser.avatar} alt="user's avatar" className=" rounded-full cursor-pointer hover:opacity-85 object-cover"/>
        <LuImagePlus className="absolute bottom-0 right-0 h-6 w-6  rounded-md cursor-pointer tool" style={{
          backgroundColor:'rgb(241 245 249)'
        }} />
      </div>
      </Tooltip>
        <input
          id="username"
          type="text"
          placeholder='Tên tài khoản'
          className="p-3 rounded-md"
          onChange={handleOnChange}
        />

        <input
          id="email"
          type="email"
          placeholder='Email'
          className="p-3 rounded-md"
          onChange={handleOnChange}
        />

      <div className='flex relative  items-center'>
          <input  
            id='password'
            type={isShowPassword ? 'text' : 'password'}
            onChange={handleOnChange}
            placeholder='Mật khẩu' 
            className='border p-3 rounded-lg w-full' 
            />
          
          <button
            type="button"
            onClick={handleTogglePassword}
            onChange={handleOnChange}
            className="text-xl absolute inset-y-0 right-5"
            aria-label={isShowPassword ? 'Hide password' : 'Show password'}
          >
            {isShowPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
          </button>
        </div>

        <button className="bg-slate-700 p-4 text-white rounded-md uppercase hover:bg-slate-500 font-semibold">Cập nhật</button>

      <div className="flex justify-between">
        <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800">Xóa tài khoản?</div>
        <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800">Đăng xuất</div>

      </div>
      </form>

      
    </div>
  )
}

export default Profile
