import React, { useState, useEffect } from 'react'
import './Bloglist.css'
import Blogcard from '../BlogCard/Blogcard'
import { data } from 'react-router-dom'

const Bloglist = () => {

    const [dataPost, setDataPost] = useState([])
    const [visible, setVisible] = useState(5);
    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 5);
    };

    useEffect(() => {
        fetch("http://localhost:8080/posteos")
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data)
            })
    }, [])

    const mapData = () => {
        return dataPost.map((e) => {
            return <Blogcard key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo} />;
        });
    };

    return (
        <div className='bloglist'>
            <div className='titleBlogs'>
                <h2 className='title2'>Blogs Recomendados</h2>
            </div>
            <div className="list">
                {dataPost.slice(0, visible).map((e) => (
                    <Blogcard key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo} />
                ))}
            </div>
            {visible < dataPost.length && (
                <button onClick={cargarMas} className="btn">
                    Ver más...
                </button>
            )}
        </div>
    )
}

export default Bloglist
