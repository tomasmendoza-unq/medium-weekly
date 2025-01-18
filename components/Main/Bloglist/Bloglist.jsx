import React from 'react'
import './Bloglist.css'
import Blogcard from '../BlogCard/Blogcard'

const Bloglist = () => {
    const blogs = [
        {title: "El Futuro de las Energías Renovables: Lo Que Nos Espera", resume: "Analizamos las últimas tendencias en energías limpias y cómo están cambiando la forma en que consumimos energía a nivel global.", id:11},
        {title: "Explorando el Minimalismo: Más con Menos", resume: "Adéntrate en el estilo de vida minimalista y descubre cómo simplificar tu entorno puede mejorar tu bienestar.", id:12},
        {title: "Ciberseguridad: Protege tu Vida Digital", resume: "Aprende consejos prácticos para proteger tus dispositivos, cuentas y datos en un mundo digital lleno de amenazas.", id:13},
        {title: "La Evolución del Desarrollo Web en la Última Década", resume: "Desde el auge de los frameworks hasta la inteligencia artificial, este artículo analiza cómo ha cambiado el panorama del desarrollo web en los últimos 10 años.", id:14},
        {title: "5 Hábitos para Maximizar tu Productividad Diaria", resume: "Descubre cómo pequeñas acciones diarias pueden transformar tu rutina y ayudarte a alcanzar tus metas de manera eficiente.", id:15},
    ]
    return (
        <div className='bloglist'>
            <div className='titleBlogs'>
                <h2>Blogs Recomendados</h2>
            </div>
            <div className="list">
                {blogs.map((e)=> (
                    <Blogcard title={e.title} resume={e.resume} key={e.id}/>
                ))}
            </div>
        </div>
    )
}

export default Bloglist
