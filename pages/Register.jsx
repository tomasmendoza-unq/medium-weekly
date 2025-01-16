import React from 'react'
import Toastify from 'toastify-js'
import { useState } from 'react'

const Register = () => {

    const alert = (text, color) => {
        Toastify({
            text: text,
            duration: 3000,
            position: "center",
            gravity: "bottom",
            offset: {
                "y": 70
            },
            style: {
                background: color,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                height: "50px",
                fontSize: "22px",
            },
        }).showToast();
    }

    const crearUsuario = async (usuario) => {
        try {
            const response = await fetch('http://localhost:8080/user/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario),
            });
            const data = await response.json();
            console.log('Usuario creado:', data);
            alert("Usuario creado correctamente", "#53796c")
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    };

    const [dataForm, setDataForm] = useState({
        "nombre": "",
        "contrasena": "",
        "rol": "REDACTOR",
        "repass": ""
    })

    const handleInput = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (dataForm.nombre === "" || dataForm.contrasena === "" || dataForm.repass === "") {
            alert("Rellena todos los campos", "#bb1a1a")
        }else {
            if (dataForm.contrasena !== dataForm.repass) {
                alert("Las contraseñas no son iguales", "#bb1a1a")
            }else if(dataForm.contrasena.length < 8){
                alert("La contraseña debe de tener un minimo de 8 caracteres", "#bb1a1a")
            }else {
                crearUsuario(dataForm)
            }
        }
        
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
