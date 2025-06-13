import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'
import { Avatar, Dropdown } from 'flowbite-react';
import {useDispatch} from 'react-redux'
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice'
import { HiLogout} from "react-icons/hi";
import { API_URL } from '../config';

const Header = () => {
    const {currentUser} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch(`${API_URL}/api/auth/sign-out`,{
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

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 shadow-md">
        <div className='flex justify-around items-center mx-auto py-3 '>
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-500">Hee</span>
                <span className="text-slate-700">Estate</span>
                </h1>
            </Link>

        <form 
            className="bg-slate-100 p-3 rounded-lg flex items-center"
            onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Tìm kiếm...' 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none w-24 sm:w-96 pr-24"
            />
            <button>
                <FaSearch className='text-slate-500'/>
            </button>
        </form>

        <ul className='flex gap-8 items-center'>
            {/* Sử dụng hidden sm:inline để khi thu nhỏ screen thì không xuất hiện */}
            <Link 
                to="/"
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700 hover:text-white font-semibold">
                    Home
                    {/* Hiệu ứng trượt underline */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>
            
            <Link 
                to="/about"
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700  hover:text-white font-semibold">
                    About
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>

            {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                        <img alt='user' src={currentUser.avatar } rounded  className="w-8 h-8 rounded-full" />
                        }
                        className='z-20'

                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <Link to={'/profile'}>
                            Profile 
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Đăng xuất</Dropdown.Item>
                    </Dropdown>
                ) :

                <Link 
                    to="/sign-in"
                    duration={500}
                    className="group relative inline-block cursor-pointer hover:text-brightColor">
                    <li className=" text-slate-700  hover:text-white font-semibold
                    ">
                        Login
                        <span className=" hidden sm:inline absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                        </li>
                </Link>
            }
        </ul>
        
        </div>
      
    </header>
  )
}

export default Header
