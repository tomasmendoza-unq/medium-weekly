import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Header/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Main from '../pages/Main'
import Register from '../pages/Register'
import Login from '../pages/Login'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
