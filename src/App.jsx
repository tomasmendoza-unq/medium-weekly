import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Header/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Main from '../pages/Main'
import Register from '../pages/Register'
import Login from '../pages/Login'

function App() {
  // const { data, setData} = useState(null)
  // useEffect(()=> {
  //   fetch("http://localhost:8080/user")
  //     .then((response)=> response.json())
  //     .then((data) => setData(data))
  //     .catch((error)=> console.log(error))
  //   console.log(data)
  // },[])
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
