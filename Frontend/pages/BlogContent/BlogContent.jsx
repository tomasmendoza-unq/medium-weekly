import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { data, useParams } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';
import Yoopta from '../../src/components/Yoopta/Yoopta';
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Comments from "../../src/components/Comments/Comments"
import './BlogContent.css'
import Blogcard from '../../src/components/Bloglist/BlogCard/Blogcard';
import Loading from '../../src/components/Loading/Loading'
import Bloglist from '../../src/components/Bloglist/Bloglist';

const BlogContent = () => {
    const { id } = useParams();
    const [dataPost, setDataPost] = useState(null);
    const [morePosts, setMorePosts] = useState(null)
    const [dataUsers, setDataUsers] = useState([]);
    const [autor, setAutor] = useState(null);
    const [value, setValue] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;


    // Fetch de datos
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetch(`${apiUrl}/posteos`)
                .then((response) => response.json())
                .then((data) => {
                    const post = data.find((e) => e.id_posteo === JSON.parse(id));
                    setDataPost(post);
                    setMorePosts(data)
                    if (post?.contenido) {
                        try {
                            const parsedContent = JSON.parse(post.contenido);
                            setValue(parsedContent);
                        } catch (error) {
                            console.error("Error al parsear el contenido:", error);
                            setValue({});
                        }
                    } else {
                        setValue({});
                    }
                }),
            fetch(`${apiUrl}/user`)
                .then((response) => response.json())
                .then((data) => setDataUsers(data))
        ]).finally(() => {
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (dataPost && dataUsers.length) {
            const author = dataUsers.find((user) => user.id_usuario === dataPost.idAutor);
            setAutor(author ? author.nombre : "Autor desconocido");
        }
    }, [dataPost, dataUsers]);  

    useEffect(() => {
        if (dataPost?.contenido) {
            try {
                const parsedContent = JSON.parse(dataPost.contenido);
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

    if (isLoading || !dataPost) {
        return <Loading />
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
                {Object.keys(value).length > 0 ? (
                    <Yoopta 
                        value={value} 
                        setValue={setValue} 
                        block={true} 
                    />
                ) : (
                    <div className="spinner"></div>
                )}
            </div>
            <Comments dataPost={dataPost} idAutor={sessionStorage.getItem("id")} idPost={dataPost.id_posteo}/>
            <div className='moreContenteContainer'>
                <h2 className='subTitleBlog'>Mas contenido...</h2>
                <Bloglist visible={4} dataPost={morePosts} clase={"moreContent"} claseBC={"miniCard"}/>
            </div>
            <div className='footerBlog'>
                <RouterLink to="/" className="btnLink linkBlog">Volver al inicio</RouterLink>
            </div>
        </section>
    );
};

export default BlogContent;