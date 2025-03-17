import { useEffect, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = ({ alert, Cookies }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const webUrl = import.meta.env.VITE_WEB_URL;

    const login = async (usuario) => {
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(usuario)
            });
    
            const data = await response.text();
            
            if (!response.ok) {
                throw new Error(data);
            }
    
            switch (data) {
                case "Usuario no encontrado":
                    alert("El usuario no existe", "#bb1a1a");
                    break;
                case "Usuario o contraseña incorrectos":
                    alert("Usuario o contraseña incorrectos", "#bb1a1a");
                    break;
                default:
                    // Cookies
                    Cookies.set("token", data);
                    alert("Bienvenido!", "#1abb9c");
                    window.location.href = `${webUrl}`;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al intentar iniciar sesión", "#bb1a1a");
        }
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
        if (dataForm.nombre === "" || dataForm.contrasena === "") {
            alert("Rellena todos los campos!", "#bb1a1a")
        }
        if (dataForm.contrasena === "") {
            alert("La contraseña no puede estar vacía", "#bb1a1a")
        }
        if (dataForm.nombre === "") {
            alert("El nombre de usuario no puede estar vacío", "#bb1a1a")
        }
        if (dataForm.nombre.length > 16) {
            alert("El nombre de usuario no puede tener más de 16 caracteres", "#bb1a1a")
        }
        if (dataForm.nombre.length < 6) {
            alert("El nombre de usuario no puede tener menos de 6 caracteres", "#bb1a1a")
        }
        if (dataForm.contrasena.length > 16) {
            alert("La contraseña no puede tener más de 16 caracteres", "#bb1a1a")
        }
        if (dataForm.contrasena.length < 8) {
            alert("La contraseña no puede tener menos de 8 caracteres", "#bb1a1a")
        } else {
            login(dataForm)
        }
    }

    useEffect(() => {
        document.title = "Medium Weekly | Login"
    }, [])

    return (
        <div className="containerLogin">
            <div className='containerForm'>
                <div className="boxForm">
                    <h2 className='titleForm'>Bienvenido.</h2>
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
                            className='inputForm'
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
                            className='inputForm'
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


