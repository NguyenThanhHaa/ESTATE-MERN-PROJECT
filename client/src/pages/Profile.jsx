import React, { useState,useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import Tooltip from '@mui/material/Tooltip';
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'
import { app } from '../firebase';
import {updateUserStart, updateUserFailure, updateUserSuccess} from '../redux/user/userSlice'
import {useDispatch} from 'react-redux'

const Profile = () => {
  const {currentUser,loading,error} = useSelector((state)=>state.user)

  const dispatch = useDispatch()

  // useRef: reference a value that’s not needed for rendering.
  const fileRef = useRef(null)

  const [file,setFile] = useState(undefined);

  console.log(file)

  const [formData,setFormData] = useState({});

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);



  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
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
  // console.log(formData)
  // console.log(filePerc)
  // console.log(fileUploadError)

  //Gọi api đki 
  const handleSubmit = async (e) =>{
    //e.preventDefault() là một phương thức trong JavaScript được sử dụng để ngăn chặn hành vi mặc định của một sự kiện. 
    //Khi một sự kiện xảy ra (ví dụ: người dùng click chuột, gửi biểu mẫu, hoặc nhấn phím), trình duyệt thực hiện một số hành động mặc định. 
    //preventDefault() được sử dụng để ngăn chặn các hành động mặc định đó.
    //Trong trường hợp này sử dụng preventDefault để ngăn việc trình duyệt sẽ reload page khi nhấn vào button submit 
    e.preventDefault();
    
    try {
      // setLoading(true);
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(updateUserFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(updateUserFailure(error.message));
    }
}

  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-7'>Profile</h1>

      <form onSubmit={handleSubmit} className="mx-auto flex flex-col gap-6 ">
        {/* Sử dụng prop hidden để ẩn 
        Sử dụng prop accept để chỉ nhận kiểu file mong muốn */}
        {/* Manipulating a DOM with a ref  */}
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept="image/*"/>  
        <Tooltip title="Tải ảnh mới" placement="right-end">
        <div className="flex relative mx-auto ">
          <img 
            src={formData.avatar || currentUser.avatar}
            alt="user's avatar" 
            className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
          <LuImagePlus
          // After React creates the DOM node and puts it on the screen, React will set the current property of your ref object to that DOM node. 
            onClick={()=>fileRef.current.click()} 
            className="absolute bottom-0 right-0 h-6 w-6  rounded-md cursor-pointer tool" 
            style={{
            backgroundColor:'rgb(241 245 249)'
            }} />
        </div>
        </Tooltip>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Lỗi tải hình ảnh 
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Đang tải ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Tải hình ảnh thành công!</span>
          ) : (
            ''
          )}
        </p>
          <input
            id="username"
            type="text"
            defaultValue={currentUser.username}
            placeholder='Tên tài khoản'
            className="p-3 rounded-md"
            onChange={handleOnChange}
          />

        <input
          id="email"
          type="email"
          defaultValue={currentUser.email}
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

        <button disabled={loading} className="bg-slate-700 p-4 text-white rounded-md uppercase hover:bg-slate-500 font-semibold">
        {loading ? 'Đang tải...' : 'Cập nhật'}
        </button>
        
        <div className="flex justify-between">
        <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800">Xóa tài khoản?</div>
        <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800">Đăng xuất</div>
      </div>

      {error && <p className='text-red-500 mt-5 font-semibold mx-auto uppercase'>{error}</p>}
      <p className='text-green-700 mt-5 font-semibold mx-auto uppercase '>{updateSuccess ? 'Cập nhật thành công!' : ''}</p>
      </form>

      
    </div>
  )
}

export default Profile
