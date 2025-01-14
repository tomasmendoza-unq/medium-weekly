import React from 'react'
import { useState } from 'react'

const Register = () => {

        const [dataForm, setDataForm] = useState({
            name: "",
            pass: "",
            repass: "",
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
                    <h2>Registro.</h2>
                    <form id='login' action="" method="post" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre de usuario</label>
                        <input type="text" name='name' placeholder='Ej: Julio Cortázar' onChange={handleInput} />
                        <label htmlFor="pass">Contraseña</label>
                        <input type='password' name='pass' placeholder='*******' onChange={handleInput} />
                        <label htmlFor="pass">Repetir Contraseña</label>
                        <input type='password' name='repass' placeholder='*******' onChange={handleInput} />
                    </form>
                    <button form='login' type="submit">Registrarse</button>
                </div>
            </div>
            <div className='svgs'>
                <img src="./svg/register.svg" alt="" />
            </div>
        </div>
    )
}

export default Register
