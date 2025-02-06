import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { data, useParams } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';
import Yoopta from '../../components/Yoopta/Yoopta';
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Comments from "../../components/Comments/Comments"
import './BlogContent.css'
import Blogcard from '../../components/Bloglist/BlogCard/Blogcard';

const BlogContent = () => {
    const { id } = useParams();
    const [dataPost, setDataPost] = useState(null);
    const [morePosts, setMorePosts] = useState(null)
    const [dataUsers, setDataUsers] = useState([]);
    const [autor, setAutor] = useState(null);
    const [value, setValue] = useState({});

    // Fetch de datos
    useEffect(() => {
        fetch("http://localhost:8080/posteos")
            .then((response) => response.json())
            .then((data) => {
                const post = data.find((e) => e.id_posteo === JSON.parse(id));
                setDataPost(post);
                setMorePosts(data)
            });
        fetch("http://localhost:8080/user")
            .then((response) => response.json())
            .then((data) => setDataUsers(data));
    }, [id]);

    // Configuración del autor
    useEffect(() => {
        if (dataPost && dataUsers.length) {
            const author = dataUsers.find((user) => user.id_usuario === dataPost.idAutor);
            setAutor(author ? author.nombre : "Autor desconocido");
        }
    }, [dataPost, dataUsers]);  

    // Configuración del contenido
    useEffect(() => {
        if (dataPost?.contenido) {
            try {
                const parsedContent = JSON.parse(dataPost.contenido); // Asegura que el contenido sea válido
                setValue(parsedContent);
                document.title = dataPost.titulo
            } catch (error) {
                console.error("Error al parsear el contenido:", error);
            }
        }
    }, [dataPost]);

    const calculateReadingTime = (content) => {
        if (!content) return "0 min";
        const words = content.replace(/<[^>]*>?/gm, "").split(" ").length;
        const readingTime = Math.ceil(words / 200);
        return `${readingTime} min`;
    };

    if (!dataPost) {
        return(
        <section className='containerLoading'>
            <div className="spinner"></div>
        </section>)
    }

    return (
        <section className="blogContent">
            <div className="headBlog">
                <h1 className="titleBlog">{dataPost.titulo}</h1>
                <RouterLink to={`/user/${dataPost.idAutor}`}><p className="textHead">{autor}</p></RouterLink>
                <span className="flex">
                    <p className="textHead">{dataPost.created.replace("T", " ") || "Fecha no disponible"}</p>
                    <p className="textHead">{calculateReadingTime(dataPost.contenido)}</p>
                </span>
            </div>
            <div className="navBlog">
                <FaPaperPlane fill="#4D4D4D" />
            </div>
            <div className="contentBlog">
                {Object.keys(value).length > 0 
                ? 
                <Yoopta value={value} block={true} />
                : 
                <div className="spinner"></div>
                }
            </div>
            <Comments dataPost={dataPost} idAutor={sessionStorage.getItem("id")} idPost={dataPost.id_posteo}/>
            <h2 className='subTitleBlog'>Leer mas...</h2>
            <div className='moreContent'>
                {morePosts.slice(0, 4).map((e)=> {
                    return(
                        <Blogcard clase={"miniCard"} key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo}/>
                    )
                })}
            </div>
            <div className='footerBlog'>
                <RouterLink to="/" className="btnLink linkBlog">Volver al inicio</RouterLink>
            </div>
        </section>
    );
};

export default BlogContent;