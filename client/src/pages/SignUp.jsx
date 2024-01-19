import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
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

        <input 
          type="password" 
          placeholder='Password' 
          className='border p-3 rounded-lg' 
          id='password'/>

        <input 
          type="password" 
          placeholder='Confirm password' 
          className='border p-3 rounded-lg' 
          id='confirm-password'/>

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
