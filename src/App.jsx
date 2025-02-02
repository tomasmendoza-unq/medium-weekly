import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Header/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from '../pages/MainContent/Main'
import Register from '../pages/Register'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import NewBlog from '../pages/NewBlog/NewBlog'
import BlogContent from '../pages/BlogContent/BlogContent'
import Yoopta from '../components/Yoopta/Yoopta'
import UserPage from '../pages/UserPage/UserPage'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/newblog' element={<NewBlog />}></Route>
          <Route path='/user/:id' element={<UserPage/>}></Route>
          {sessionStorage.getItem("id") 
            ?
            <Route path='/blog/:id' element={<BlogContent />}></Route>
            :
            <Route path='/login' element={<Login />}></Route>
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
