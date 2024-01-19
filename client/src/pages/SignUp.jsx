import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";


const SignUp = () => {
  const [password, setPassword] = useState('');

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleToggleConfirmPassword = () =>{
    setIsConfirmPassword(!isConfirmPassword)
  }

  const handleOnChangePassword= (value) => {
    setPassword(value)
  }

  return (
    //Canh object ở giữa thì sử dụng mx-auto
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className='flex flex-col gap-6'>
        <input 
          type="text" 
          placeholder='Username' 
          className='border p-3 rounded-lg' 
          id='username'/>

        <input 
          type="email" 
          placeholder='Email' 
          className='border p-3 rounded-lg' 
          id='email'/>

        <div className='flex  relative  items-center'>
          <input  
                type={isShowPassword ? 'text' : 'password'}
                onClick={() => setIsShowPassword(!isShowPassword)}
                placeholder='Password' 
                className='border p-3 rounded-lg w-full' 
                id='password'/>

          <button
            type="button"
            onClick={handleTogglePassword}
            className="text-xl absolute inset-y-0 right-5"
            aria-label={isShowPassword ? 'Hide password' : 'Show password'}
          >
            {isShowPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
          </button>
           
        </div>

        <div className='flex  relative  items-center'>
          <input 
            type={isConfirmPassword ? 'text' : 'password'}
            onClick={() => setIsConfirmPassword(!isConfirmPassword)}
            onChange={handleOnChangePassword}
            placeholder='Confirm password' 
            className='border p-3 rounded-lg w-full' 
            id='confirm-password'/>

          <button
            type="button"
            onClick={handleToggleConfirmPassword}
            onChange={handleOnChangePassword}
            className="text-xl absolute inset-y-0 right-5"
            aria-label={isConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {isConfirmPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
          </button>

        </div>
        
       
        <button className="bg-slate-700 text-white rounded-lg py-2 uppercase hover:bg-slate-500 disabled:opacity-80">Sign Up</button>

      </form>

      <div className="flex gap-2 my-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-sky-700 hover:opacity-50">Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
