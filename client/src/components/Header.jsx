import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 shadow-md">
        <div className='flex justify-around items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-500">Hee</span>
                <span className="text-slate-700">Estate</span>
                </h1>
            </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" placeholder='Search...' className="bg-transparent focus:outline-none w-24 sm:w-64"/>
            <FaSearch className='text-slate-500'/>
        </form>

        <ul className='flex gap-8 font-semibold'>
            {/* Sử dụng hidden sm:inline để khi thu nhỏ screen thì không xuất hiện */}
            <Link 
                to="/"
                spy={true}
                smooth={true}
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700 hover:text-white">
                    Home
                    {/* Hiệu ứng trượt underline */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>
            
            <Link 
                to="/about"
                spy={true}
                smooth={true}
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className="hidden sm:inline text-slate-700  hover:text-white">
                    About
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </li>
            </Link>
           
           <Link 
                to="/sign-in"
                spy={true}
                smooth={true}
                duration={500}
                className="group relative inline-block cursor-pointer hover:text-brightColor">
                <li className=" text-slate-700 hover:text-white">
                {''}
                Sign in
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </li>
           </Link>
            
        </ul>
        </div>
      
    </header>
  )
}

export default Header
