import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [formData,setFormData] = useState({});

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const [error,setError] = useState(null);

  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();



  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleToggleConfirmPassword = () =>{
    setIsConfirmPassword(!isConfirmPassword)
  }

  //Handle các giá trị do người dùng nhập vào các trường dữ liệu 
  const handleOnChange= (e) => {
    //Sử dụng method setFormData để update các state của formData 
    setFormData(
      {
        ...formData,//Copy các properties của formData bằng cách sử dụng operator spread ... vào 1 formData mới 
        [e.target.id]: e.target.value
        // e.target.id: trường nhập liệu được truyền qua từ onChange 
        // e.target.value: giá trị người dùng đã nhập  
      }
    )
  }

  console.log(formData)

  //Gọi api đki 
  const handleSubmit = async (e) =>{
    //e.preventDefault() là một phương thức trong JavaScript được sử dụng để ngăn chặn hành vi mặc định của một sự kiện. 
    //Khi một sự kiện xảy ra (ví dụ: người dùng click chuột, gửi biểu mẫu, hoặc nhấn phím), trình duyệt thực hiện một số hành động mặc định. 
    //preventDefault() được sử dụng để ngăn chặn các hành động mặc định đó.
    //Trong trường hợp này sử dụng preventDefault để ngăn việc trình duyệt sẽ reload page khi nhấn vào button submit 
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
}
  
  return (
    //Canh object ở giữa thì sử dụng mx-auto
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Đăng Kí</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input 
          type="text" 
          placeholder='Tên tài khoản'
          //Khi users nhập liệu vào trường này, state formData sẽ được cập nhật sao chép tất cả giá trị hiện tại của formData và ghi đè giá trị của trường "username" bằng giá trị người dùng đã nhập thông qua onChange.
          onChange={handleOnChange} 
          className='border p-3 rounded-lg' 
          id='username'/>

        <input 
          type="email" 
          placeholder='Email'
          onChange={handleOnChange}
          className='border p-3 rounded-lg' 
          id='email'/>

        <div className='flex relative  items-center'>
          <input  
                type={isShowPassword ? 'text' : 'password'}
                onChange={handleOnChange}
                placeholder='Mật khẩu' 
                className='border p-3 rounded-lg w-full' 
                id='password'/>
          
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

        <div className='flex relative items-center'>
          <input 
            type={isConfirmPassword ? 'text' : 'password'}
            onChange={handleOnChange}
            placeholder='Xác nhận mật khẩu' 
            className='border p-3 rounded-lg w-full' 
            id='confirm-password'/>

          <button
            type="button"
            onClick={handleToggleConfirmPassword}
            className="text-xl absolute inset-y-0 right-5"
            aria-label={isConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {isConfirmPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
           </button>
        </div>
        
        <button
          disabled={loading} 
          className="bg-slate-700 text-white rounded-lg py-2 uppercase hover:bg-slate-500 disabled:opacity-80">{loading ? 'Đợi xíu nha...' : 'Đăng Kí'}</button>
      </form>

      <div className="flex gap-2 my-4">
        <p>Đã có tài khoản?</p>
        <Link to={"/sign-in"}>
          <span className="text-sky-700 hover:opacity-50">Đăng nhập</span>
        </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
