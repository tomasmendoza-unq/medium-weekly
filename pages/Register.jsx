import React from 'react'
import { useState } from 'react'

const Register = () => {
        const crearUsuario = async (usuario) => {
            try {
                const response = await fetch('http://localhost:8080/user/crear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuario),
                });
                const data = await response.json();
                console.log('Usuario creado:', data);
            } catch (error) {
                console.error('Error al crear usuario:', error);
            }
        };
    
        const [dataForm, setDataForm] = useState({
            "nombre": "",
            "contrasena": "",
            "rol": "REDACTOR"
        })
    
        const handleInput = (e) => {
            setDataForm({ ...dataForm, [e.target.name]: e.target.value })
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
            console.log("Console.log de la informacion del Form")
            console.log(dataForm)
            crearUsuario(dataForm)
        }

    
    return (
        <div className="containerLogin">
            <div className='containerForm'>
                <div className="boxForm">
                    <h2>Registro.</h2>
                    <form id='login' action="" method="POST" onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre de usuario</label>
                        <input type="text" name='nombre' placeholder='Ej: Julio Cortázar' onChange={handleInput} />
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type='password' name='contrasena' placeholder='*******' onChange={handleInput} />
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
