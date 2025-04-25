import { useState, useEffect } from 'react'
import './Contact.css'
import { FaLinkedin } from "react-icons/fa6";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', formData)
    }

    useEffect(() => {
        document.title = "Medium Weekly | Contacto"
    }, [])

    return (
        <div className="containerContact">
            <div className="contactContent">
                <h2 className="title2">Contacto</h2>
                <p className="contactDesc">¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos.</p>
                
                <form onSubmit={handleSubmit} className="contactForm">
                    <div className="formGroup">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Tu nombre"
                            onChange={handleInput}
                            className="inputContact"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="tu@email.com"
                            onChange={handleInput}
                            className="inputContact"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            placeholder="Escribe tu mensaje aquí..."
                            onChange={handleInput}
                            className="textareaContact"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn">Enviar mensaje</button>
                </form>

                <div className="contactInfo">
                    <h3>Contactanos directamente:</h3>
                    <div className="socialLinks">
                        <figure className="figureContact">
                            <p>Desarrollador Backend:</p>
                            <a href="https://www.linkedin.com/in/tomas-ismael-mendoza-30b141258/" target='_blank'>Tomas Mendoza</a>
                        </figure>
                        <figure className="figureContact">
                            <p>Desarrollador Frontend:</p>
                            <a href="https://www.lucianobarberis.com.ar" target='_blank'>Luciano Barberis</a>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact