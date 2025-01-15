import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    const [dataForm, setDataForm] = useState({
        nombre: "",
        contrasena: "",
    })

    const handleInput = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(dataForm)
    }

    return (
        <div className="containerLogin">
            <div className='containerForm'>
                <div className="boxForm">
                    <h2>Bienvenido.</h2>
                    <form id='login' action="" method="post" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre de usuario</label>
                        <input type="text" name='nombre' placeholder='Ej: Julio Cortázar' onChange={handleInput} />
                        <label htmlFor="pass">Contraseña</label>
                        <input type='password' name='contrasena' placeholder='*******' onChange={handleInput} />
                    </form>
                    <button form='login' type="submit">Log In</button>
                    <Link to="/register" className='linkLogin'>¿No tenes cuenta?</Link>
                </div>
            </div>
            <div className='svgs'>
                <img src="./svg/reading.svg" alt="" />
            </div>
        </div>
    )
}

export default Login