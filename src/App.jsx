import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from '../pages/MainContent/Main'
import Register from '../pages/Register'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import NewBlog from '../pages/NewBlog/NewBlog'
import BlogContent from '../pages/BlogContent/BlogContent'
import Yoopta from '../components/Yoopta/Yoopta'
import UserPage from '../pages/UserPage/UserPage'
import Toastify from 'toastify-js'

function App() {

  const alert = (text, color) => {
    Toastify({
      text: text,
      duration: 3000,
      position: "right",
      gravity: "bottom",
      offset: {
        "y": 50,
        "x": 50
      },
      style: {
        background: color || "#4D4D4D",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        fontSize: "20px",
        borderRadius: "5px",
        fontFamily: "Inter",
        fontWeight: "300",
      },
    }).showToast();
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/register' element={<Register alert={alert} />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/newblog' element={<NewBlog />}></Route>
          <Route path='/user/:id' element={<UserPage />}></Route>
          {sessionStorage.getItem("id")
            ?
            <Route path='/blog/:id' element={<BlogContent />}></Route>
            :
            <Route path='/login' element={<Login alert={alert} />}></Route>
          }
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
