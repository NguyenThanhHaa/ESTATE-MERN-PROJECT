import React, { useState,useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import Tooltip from '@mui/material/Tooltip';
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'
import { app } from '../firebase';
import {updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signInFailure, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice'
import {useDispatch} from 'react-redux'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosClose } from "react-icons/io";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  const [isOpen, setIsOpen] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);

  const [userListings, setUserListings] = useState([]);

  const [isShowListings,setIsShowListings] = useState(false);

  
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
      showSuccessfulToastMessage('Cập nhật hồ sơ thành công!');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(updateUserFailure(error.message));
      showErrorToastMessage(error.message);
    }
}

//Modal 
const handleOpen = () => setIsOpen(true);
const handleClose = () => setIsOpen(false);

const handleDeleteUser = async()=>{
  try{
    dispatch(deleteUserStart());
    
    const res = await fetch (`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })

    const data = await res.json();
    if(data.success===false){
      dispatch(deleteUserFailure(data.message));
    }

    dispatch(deleteUserSuccess(data))
  }catch(error){
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch ('/api/auth/sign-out',{
      METHOD:'POST'
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
    
  }
};

  const handleShowListings = async ()=>{
    try{

      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`,{
        method:'GET'
      });

      const data = await res.json();

      if(data.success === false){
        setShowListingsError(true);
        return; 
      }
      setUserListings(data);
      console.log(data);
    }catch(error){
      setShowListingsError(true);
      setIsShowListings(false);
    }
  }

  // Check listings were showed or not
  const handleIsOpenListings = async() => {
    setIsShowListings(true);
    await handleShowListings();
   
  };
  const handleIsCloseListings = () => setIsShowListings(false);

  // Show Successful Toast Message
  const showSuccessfulToastMessage = (text) => {
    toast.success(text);
  };

  // Show Error Toast Message
  const showErrorToastMessage = (text) =>{
    toast.error(text);
  }

  const handleDeleteListing = async(listingId) =>{
    try{
      const res = await fetch(`api/listing/delete/${listingId}`,{
        method:'DELETE'
      })

      const data = await res.json();

      if(data.success === false){
        return;
      }

      showSuccessfulToastMessage('Xóa thành công!');
      setUserListings((prev)=> prev.filter((listing)=> listing._id !== listingId));
      

    }catch(error){
      showErrorToastMessage('Có lỗi trong quá trình thực hiện. Vui lòng thử lại!');
    }
  }


  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-7'>Hồ sơ người dùng</h1>

      <form onSubmit={handleSubmit} className="mx-auto flex flex-col gap-4 ">
        {/* Sử dụng prop hidden để ẩn 
        Sử dụng prop accept để chỉ nhận kiểu file mong muốn */}
        {/* Manipulating a DOM with a ref  */}
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept="image/*"/>  
        <Tooltip title="Tải ảnh mới" placement="right-end">
        <div className="flex relative mx-auto ">
          <img 
            src={formData.avatar || currentUser.avatar}
            alt="user's avatar" 
            className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            onClick={()=>fileRef.current.click()} />
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
        {loading ? <p>Đang tải...</p> : <p>Cập nhật</p>}
        </button>
        
        <button className="bg-sky-900 p-4 text-white rounded-md uppercase hover:bg-sky-800 font-semibold">
          <Link to={"/create-listing"}>
            Tạo danh sách
          </Link>
        </button>
        
        <div className="flex justify-between">
          <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800"
            onClick={handleOpen}
          >Xóa tài khoản?</div>
          <div className="text-red-600 hover:cursor-pointer font-semibold hover:text-red-800"
            onClick={handleSignOut}
          >Đăng xuất</div>
        </div>
      
        {error ?(
        <ToastContainer/>
        ) : null}
        {updateSuccess ? (
          <ToastContainer/>
        ) : null}
   
      </form>

      <div className=" text-center text-green-800 rounded-md uppercase hover:text-green-600 font-semibold ">
        {isShowListings ? 
          <p 
            onClick={handleIsCloseListings}
            className="cursor-pointer"
            >Đóng danh sách</p> 
          : <p 
              onClick={handleIsOpenListings}
              className="cursor-pointer"
              >Xem danh sách đã tạo</p>}
        </div>

        {showListingsError ? 'Có lỗi trong quá trình hiển thị. Vui lòng thử lại sau!' : ''}
      
      {
        isShowListings ? (
            userListings && userListings.length >0 && (
              <div className='flex flex-col gap-4 mt-4'>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className='bg-white border rounded-lg p-3 flex justify-between items-center gap-4'
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt='listing cover'
                      className='h-16 w-16 rounded-md'
                    />
                  </Link>
                  <Link
                    className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>
    
                  <div className='flex item-center font-semibold gap-3 '>
                    <button
                      className='text-red-700'
                      onClick={()=> handleDeleteListing(listing._id)}
                    >
                      Xóa
                    </button>

                    <p className="text-gray-300">|</p>
                  <Link
                    to={`/update-listing/${listing._id}`}
                  >
                    <button 
                        className='text-green-700'

                      >Sửa</button>
                  </Link>
                    
                    
                  </div>
                </div>
              ))}
            </div>
        )) : ''
      } 

      <Modal
        className="modal-delete-user"
        open={isOpen}
        onClose={handleClose}
      >
        <Box className="bg-slate-100 top-1/2 bottom-1/2 mx-auto mt-72 w-2/6 rounded-xl border-none">
            <div className="flex flex-col gap-2">
              <div className="flex justify-end px-2 py-1">
                <IoIosClose className=" text-black font-bold cursor-pointer size-7" onClick={handleClose} />
              </div>
              
              <div className="mb-3">
                <h1 className="text-center font-bold my-4 uppercase text-red-800">Bạn có chắc chắn xóa tài khoản?</h1>
              </div>
              
              <div className="flex justify-center gap-5 my-5 mx-5 px-2">
                <button className="bg-slate-800 text-white rounded-md px-2 py-2 hover:bg-slate-600"
                  onClick={handleDeleteUser}
                >Đồng ý</button>
                <button className="bg-gray-400 text-slate-900 rounded-md px-4 py-2 hover:bg-slate-500"
                  onClick={handleClose}
                >Hủy</button>
              </div>
            </div>

        </Box>

      </Modal>


      
      
    </div>
    
  )
}

export default Profile
