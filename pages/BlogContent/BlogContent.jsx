import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { data, useParams } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Comments from "../../components/Comments"
// Plugins
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import { HeadingTwo, HeadingThree } from '@yoopta/headings';
import Code from "@yoopta/code";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
// Tools
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
// Marks
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import './BlogContent.css'

// * Yoopta
const plugins = [Paragraph, Blockquote, Code, HeadingTwo, HeadingThree, Embed, Link];
const TOOLS = {
    Toolbar: {
        tool: Toolbar,
        render: DefaultToolbarRender,
    },
    ActionMenu: {
        tool: ActionMenu,
        render: DefaultActionMenuRender,
    },
    LinkTool: {
        tool: LinkTool,
        render: DefaultLinkToolRender,
    },
};
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const BlogContent = () => {
    const { id } = useParams();
    const [dataPost, setDataPost] = useState(null);
    const [dataUsers, setDataUsers] = useState([]);
    const [autor, setAutor] = useState(null);
    const [value, setValue] = useState({});
    const editor = useMemo(() => createYooptaEditor(), []);

    // Fetch de datos
    useEffect(() => {
        fetch("http://localhost:8080/posteos")
            .then((response) => response.json())
            .then((data) => {
                const post = data.find((e) => e.id_posteo === JSON.parse(id));
                setDataPost(post);
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
        return <p>Cargando contenido...</p>;
    }

    return (
        <section className="blogContent">
            <div className="headBlog">
                <h1 className="titleBlog">{dataPost.titulo}</h1>
                <RouterLink to={`/user/${dataPost.idAutor}`}><p className="textHead">{autor}</p></RouterLink>
                <span className="flex">
                    <p className="textHead">{dataPost.created || "Fecha no disponible"}</p>
                    <p className="textHead">{calculateReadingTime(dataPost.contenido)}</p>
                </span>
            </div>
            <div className="navBlog">
                <FaPaperPlane fill="#4D4D4D" />
            </div>
            <div className="contentBlog">
                {Object.keys(value).length > 0 ? (
                    <YooptaEditor
                        editor={editor}
                        plugins={plugins}
                        placeholder="Escribe algo..."
                        value={value}
                        onChange={(updatedValue) => setValue(updatedValue)}
                        tools={TOOLS}
                        marks={MARKS}
                        style={{ width: "100%" }}
                        readOnly
                    />
                ) : (
                    <p>Cargando contenido del editor...</p>
                )}
            </div>
            <Comments />
            <div className='footerBlog'>
                <RouterLink to="/" className="btnLink linkBlog">Volver al inicio</RouterLink>
            </div>
        </section>
    );
};

export default BlogContent;