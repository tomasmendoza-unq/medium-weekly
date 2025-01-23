import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import Yoopta from '../../components/Yoopta/Yoopta';
import './BlogContent.css'

const BlogContent = () => {

    const { id } = useParams()
    const [dataPost, setDataPost] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const [autor, setAutor] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8080/posteos")
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data.find((e)=> e.id_posteo === JSON.parse(id)))
            })
        fetch("http://localhost:8080/user")
            .then((response) => response.json())
            .then((data) => {
                setDataUsers(data)
            })
    }, [])

    // const handleButton = () => {
    //     console.log(dataUsers)
    // }

    return (
        <section className='blogContent'>
            <div className='headBlog'>
                <h1 className='titleBlog'>{dataPost.titulo}</h1>
                <p className='textHead'>[Nombre del autor]</p>
                <span className='flex'>
                    <p className='textHead'>[Fecha de creación]</p>
                    <p className='textHead'>[Tiempo de lectura]</p>
                </span>
            </div>
            <div className='navBlog'>
                <FaBookmark fill='#4D4D4D' />
                <FaPaperPlane fill='#4D4D4D' />
            </div>
            <div className='contentBlog'>
                <h2 className='subTitleBlog'>[Que manera de renegar con la libreria de Yoopta]</h2>
                <p className='textBlog'>El contenido de los blogs esta harcodeado porque estoy renegando con la libreria de ... que elegi :)</p>
                <p className='textBlog'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolore est iure consectetur reiciendis? Repellat, itaque tempore! Quod magnam odit facere officiis? Mollitia, explicabo ut. Facilis, enim? Rem, deleniti enim.</p>
                <p className='textBlog'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium aliquam similique qui voluptate harum excepturi blanditiis dolor corrupti quidem doloremque culpa pariatur odit eligendi architecto aperiam, quibusdam minus adipisci in?</p>
                <h2 className='subTitleBlog'>Este es otro subtitulo</h2>
                <p className='textBlog'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae excepturi tenetur dicta eum commodi similique illo possimus fugit! Fugiat voluptates saepe quod est perferendis optio, hic architecto excepturi vitae temporibus?</p>
                <p className='textBlog'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae excepturi tenetur dicta eum commodi similique illo possimus fugit! Fugiat voluptates saepe quod est perferendis optio, hic architecto excepturi vitae temporibus?</p>
                <p className='textBlog'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae excepturi tenetur dicta eum commodi similique illo possimus fugit! Fugiat voluptates saepe quod est perferendis optio, hic architecto excepturi vitae temporibus?</p>
            </div>
        </section>
    )
}

export default BlogContent
