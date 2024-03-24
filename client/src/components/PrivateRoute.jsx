import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoute = () => {
    const{currentUser} = useSelector((state) =>state.user)
    // Kiểm tra nếu currentUser tồn tại (nghĩa là người dùng đã đăng nhập), thì trả về <Outlet />, cho phép hiển thị các routes con. 
    // Ngược lại, nếu không có currentUser, thì sẽ sử dụng Navigate để chuyển hướng người dùng đến trang đăng nhập ('/sign-in').
    return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute
