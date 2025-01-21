import { useEffect, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Toastify from 'toastify-js'

const Login = () => {
    const [dataUsers, setDataUsers] = useState()
    useEffect(() => {
        fetch("http://localhost:8080/user")
            .then((response) => response.json())
            .then((data) => {
                setDataUsers(data)
            })
    }, [])

    const alert = (text) => {
        Toastify({
            text: text,
            duration: 3000,
            position: "right",
            gravity: "bottom",
            offset: {
                "y": 50
            },
            style: {
                background: "#4D4D4D",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                fontSize: "20px",
                borderRadius: "5px",
                fontFamily: "Inter",
                fontWeight: "400",
            },
        }).showToast();
    }

    const [dataForm, setDataForm] = useState({
        nombre: "",
        contrasena: "",
    })

    const handleInput = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (dataUsers.find((e) => e.nombre === dataForm.nombre && e.contrasena === dataForm.contrasena)) {
            alert("Entrando...")
            // ? Aca deberia ir el añadido de cookies
            sessionStorage.setItem("logged", true)
            sessionStorage.setItem("user", dataForm.nombre)
            setTimeout(() => {
                window.location.replace("http://localhost:5173/")
            }, 1000);
        } else {
            if (dataForm.contrasena === "") {
                alert("La contraseña no puede estar vacía")
            }else 
            if (dataForm.nombre === "") {
                alert("El nombre de usuario no puede estar vacío")
            }else
            if (dataForm.nombre.length > 16) {
                alert("El nombre de usuario no puede tener más de 16 caracteres")
            } 
            if (dataForm.nombre.length < 6) {
                alert("El nombre de usuario no puede tener menos de 6 caracteres")
            }
            if (dataForm.contrasena.length > 16) {
                alert("La contraseña no puede tener más de 16 caracteres")
            }
            if (dataForm.contrasena.length < 8) {
                alert("La contraseña no puede tener menos de 8 caracteres")
            }
            else {
                alert("Contraseña o nombre incorrectos")
            }
            
        }
    }

    return (
        <div className="containerLogin">
            <div className='containerForm'>
                <div className="boxForm">
                    <h2 className='title2'>Bienvenido.</h2>
                    <form id='login' action="" method="post" onSubmit={handleSubmit}>

                        <label htmlFor="name">Nombre de usuario</label>
                        <input 
                            type="text" 
                            name='nombre' 
                            required
                            minLength="6"
                            maxLength="16"
                            placeholder='Ej: Julio Cortázar' 
                            onChange={handleInput} 
                        />

                        <label htmlFor="pass">Contraseña</label>
                        <input 
                            type='password' 
                            minLength="8" 
                            required 
                            maxLength="16" 
                            name='contrasena' 
                            placeholder='*******' 
                            onChange={handleInput} 
                        />
                    </form>
                    <button className='btn' form='login' type="submit">Log In</button>
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