import React, { useState, useEffect } from 'react'
import './Bloglist.css'
import Blogcard from '../BlogCard/Blogcard'

const Bloglist = () => {

    const [dataPost, setDataPost] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/posteos") 
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data)
            })
    }, [])

    const mapData = () => {
        return dataPost.map((e) => {
            return <Blogcard key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo}/>;
        });
    };

    return (
        <div className='bloglist'>
            <div className='titleBlogs'>
                <h2 className='title2'>Blogs Recomendados</h2>
            </div>
            <div className="list">
                {mapData()}
            </div>
        </div>
    )
}

export default Bloglist
