import React from 'react'
import image from '../assets/google-icon.png'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import {app} from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { API_URL } from '../config';

export default function OAuth (){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result);

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  
  };

  return (
    <button id="sign-in-btn" onClick={handleGoogleClick}  type="button" className="bg-red-700 text-white py-2 rounded-lg uppercase flex items-center justify-center hover:bg-red-800">
       <div>Đăng nhập với</div>
       <img src={image} style={{width:'5%'}}/>
    </button>
  )
}
