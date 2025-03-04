import React from 'react'
import { useState, useEffect } from 'react'

const Register = ({ alert }) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const webUrl = import.meta.env.VITE_WEB_URL;
    const [dataUsers, setDataUsers] = useState()
    
    useEffect(() => {
        fetch(`${apiUrl}/user`)
            .then((response) => response.json())
            .then((data) => {
                setDataUsers(data)
            })
    }, [])

    const crearUsuario = async (usuario) => {
        fetch("http://localhost:8080/user/crear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                alert("Usuario creado correctamente!", "#1abb9c")
                // window.location.href = `${webUrl}login`
            })
            .catch(error => console.error("Error:", error));
    };

    const [dataForm, setDataForm] = useState({
        "nombre": "",
        "contrasena": "",
    })

    const handleInput = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (dataForm.nombre === "" || dataForm.contrasena === "") {
            alert("Rellena todos los campos!", "#bb1a1a")
        } else {
            if (dataForm.nombre.length < 6) {
                alert("El nombre debe de tener un minimo de 6 caracteres!", "#bb1a1a")
            }

            else if (dataForm.contrasena.length < 8) {
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

    useEffect(()=>{
        document.title = "Medium Weekly | Registro"
    },[])

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
                            className='input'
                        />

                        <label htmlFor="contrasena">Contraseña</label>
                        <input 
                            type='password' 
                            name='contrasena' 
                            required 
                            maxLength="16" 
                            placeholder='*******' 
                            onChange={handleInput}
                            className='input'
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
