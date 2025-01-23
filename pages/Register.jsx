import React from 'react'
import Toastify from 'toastify-js'
import { useState, useEffect } from 'react'

const Register = () => {

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

    const [dataUsers, setDataUsers] = useState()
    useEffect(() => {
        fetch("http://localhost:8080/user")
            .then((response) => response.json())
            .then((data) => {
                setDataUsers(data)
            })
    }, [])

    const crearUsuario = async (usuario) => {
        try {
            const response = await fetch('http://localhost:8080/user/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario),
            });
            alert("Usuario creado correctamente", "#1abb1a")
            setTimeout(() => {
                window.location.replace("http://localhost:5174/login")
            }, 1000);
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
            alert("Rellena todos los campos!", "#bb1a1a")
        } else {
            if (dataForm.nombre.length < 6) {
                alert("El nombre debe de tener un minimo de 6 caracteres!", "#bb1a1a")
            }
            if (dataForm.contrasena !== dataForm.repass) {
                alert("Las contraseñas no son iguales!", "#bb1a1a")
            } else if (dataForm.contrasena.length < 8) {
                alert("La contraseña debe de tener un minimo de 8 caracteres!", "#bb1a1a")
            } else {
                if (dataUsers.find((e) => dataForm.nombre === e.nombre )) {
                    alert("El nombre ya esta en uso", "#bb1a1a")
                } else {
                    crearUsuario(dataForm)
                }
            }
        }

    }


    return (
        <div className="containerLogin">
            <div className='containerForm'>
                <div className="boxForm">
                    <h2 className='title2'>Registro.</h2>
                    <form id='login' action="" method="POST" onSubmit={handleSubmit}>

                        <label htmlFor="nombre">Nombre de usuario</label>
                        <input 
                            type="text" 
                            name='nombre'
                            required
                            minLength="6"
                            maxLength="16" 
                            placeholder='Ej: Julio Cortázar' 
                            onChange={handleInput} 
                        />

                        <label htmlFor="contrasena">Contraseña</label>
                        <input 
                            type='password' 
                            name='contrasena' 
                            required 
                            maxLength="16" 
                            placeholder='*******' 
                            onChange={handleInput} 
                        />

                        <label htmlFor="pass">Repetir Contraseña</label>
                        <input 
                            type='password' 
                            required 
                            maxLength="16" 
                            minLength="8" 
                            name='repass' 
                            placeholder='*******' 
                            onChange={handleInput} 
                        />
                    </form>
                    <button className='btn' form='login' type="submit">Registrarse</button>
                </div>
            </div>
            <div className='svgs'>
                <img src="./svg/register.svg" alt="" />
            </div>
        </div>
    )
}

export default Register
