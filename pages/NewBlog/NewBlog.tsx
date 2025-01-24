import './NewBlog.css'
import { useEffect, useState } from 'react'
import Yoopta from '../../components/Yoopta/Yoopta'
import { YooptaContentValue } from "@yoopta/editor";

const NewBlog = () => {

    const [value, setValue] = useState<YooptaContentValue>({});
    const [dataBlog, setDataBlog] = useState({
        "titulo": '',
        "resumen": '',
        "contenido": "",
        "src": './img/coffe.png',
        "idAutor": sessionStorage.getItem('id')
    });

    const padStart = (str: string, targetLength: number, padString: string = "0"): string => {
        while (str.length < targetLength) {
            str = padString + str;
        }
        return str;
    };

    const crearPost = async (blog: {}) => {
        try {
            const res = await fetch('http://localhost:8080/posteos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blog),
            });
            
            if (!res.ok) {
                console.log(blog)
                const errorDetails = await res.json();
                console.error('Error details:', errorDetails);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            setTimeout(() => {
                window.location.replace("http://localhost:5174/")
            }, 1000);
            const data = await res.json();
            console.log('Post created successfully:', data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const updateContent = () => {
        setDataBlog((prev) => ({
            ...prev,
            contenido: JSON.stringify(value),
        }));
    };

    useEffect(() => {
        updateContent();
    }, [value]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDataBlog({
            ...dataBlog,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        crearPost(dataBlog);
    }
    return (
        <section className='containerNewBlog'>
            <div className='titleBlogs'>
                <h2 className='title2'>Crear un nuevo Blog</h2>
            </div>
            <div className='contentNewBlog'>
                <form onSubmit={handleSubmit} id='formBlog' className='formNewBlog' action="post">
                    <label className='title2NewBlog' htmlFor="titulo">Titulo:</label>
                    <input
                        onChange={handleInput}
                        type="text"
                        name='titulo'
                        id='title'
                        className='inputNewBlog titleNewBlog'
                    />

                    <label className='title2NewBlog' htmlFor="resume">Resumen:</label>
                    <textarea
                        onChange={handleInput}
                        name='resumen'
                        id='resume'
                        className='inputNewBlog resumeNewBlog'
                        cols={30}
                    />
                    <label className='title2NewBlog' htmlFor="content">Contenido:</label>
                    <Yoopta value={value} setValue={setValue} block={false} />
                </form>
                <button className='btn' form='formBlog' type="submit">Enviar</button>
            </div>
        </section>
    )
}

export default NewBlog