import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'
import { Avatar, Dropdown } from 'flowbite-react';
import {useDispatch} from 'react-redux'
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice'
import { HiLogout} from "react-icons/hi";

const Header = () => {
    const {currentUser} = useSelector(state=>state.user);
    const dispatch = useDispatch();

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

  return (
    <header className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 shadow-md">
        <div className='flex justify-around items-center max-w-6xl mx-auto py-3 px-10'>
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-500">Hee</span>
                <span className="text-slate-700">Estate</span>
                </h1>
            </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" placeholder='Tìm kiếm...' className="bg-transparent focus:outline-none w-24 sm:w-64"/>
            <FaSearch className='text-slate-500'/>
        </form>

        <ul className='flex gap-8 font-semibold items-center'>
            {/* Sử dụng hidden sm:inline để khi thu nhỏ screen thì không xuất hiện */}
            <Link 
                to="/"
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700 hover:text-white">
                    Trang chủ
                    {/* Hiệu ứng trượt underline */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>
            
            <Link 
                to="/about"
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700  hover:text-white">
                    Giới thiệu
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                        <Avatar alt='user' img={currentUser.avatar} rounded className="w-8 h-8" />
                        }
                        className='z-20'
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={'/profile'}>
                            <Dropdown.Item>Hồ sơ</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
                    </Dropdown>
                ) 
                : 
                <Link 
                to="/sign-in"
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700  hover:text-white">
                    Đăng nhập 
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
                </Link>
            
        }
        
           
                
            
        </ul>
        </div>
      
    </header>
  )
}

export default Header
