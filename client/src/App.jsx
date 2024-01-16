import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../src/pages/Home'
import SignIn from '../src/pages/SignIn'
import SignUp from './pages/SignUp'
import About from '../src/pages/About'
import Profile from '../src/pages/Profile'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>

       

      </Routes>
    </BrowserRouter>
  )
}

export default App
