import './NewBlog.css'
import { useEffect, useState } from 'react'
import Yoopta from '../../src/components/Yoopta/Yoopta'
import Toastify from 'toastify-js'
import TagSelector from '../../src/components/TagSelector/TagSelector'
import { data } from 'react-router-dom'
import Cookies from 'js-cookie'

const NewBlog = ({ alert }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [tagSelected, setTag] = useState("")

    const [tags, setTags] = useState([]);
    const crearPost = async (blog) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert("No hay sesión activa", "#bb1a1a");
                return;
            }
            const res = await fetch(`${apiUrl}/api/posteos/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blog)
            });
    
            if (!res.ok) {
                const errorDetails = await res.text();
                console.error('Error details:', errorDetails);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            alert("Blog creado correctamente", "#1abb1a");
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (error) {
            console.error('Error creating post:', error);
            alert("Error al crear el blog", "#bb1a1a");
        }
    }

    // ? Valores del contenido
    const [value, setValue] = useState({
        "cc67c1ab-5198-453c-818d-be570352bb43": {
            "id": "cc67c1ab-5198-453c-818d-be570352bb43",
            "type": "HeadingTwo",
            "meta": {
                "depth": 0,
                "order": 0
            },
            "value": [
                {
                    "id": "93fa05b9-b978-49b4-91bb-bfc558f7637f",
                    "type": "heading-two",
                    "props": {
                        "nodeType": "block"
                    },
                    "children": [
                        {
                            "text": "Escribe algo..."
                        }
                    ]
                }
            ]
        }
    });

    // ? Información a enviar a la base de datos
    const [dataBlog, setDataBlog] = useState({
        "titulo": '',
        "resumen": '',
        "contenido": "",
        "src": '/img/coffe.png',
        "idAutor": 1,
        "categoria": ""
    });

    // ? Funcion para actualizar el contenido a enviar a la BDD
    const updateContent = () => {
        setDataBlog((prev) => ({
            ...prev,
            contenido: JSON.stringify(value),
            categoria: tagSelected
        }));
    };

    useEffect(() => {
        updateContent();
    }, [value, tagSelected]);

    useEffect(()=>{
        document.title = "Medium Weekly | Crear Blog"
    },[])

    const handleInput = (e) => {
        setDataBlog({
            ...dataBlog,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (dataBlog.titulo.length <= 6) {
            alert("El título debe tener un minimo de 6 caracteres", "#bb1a1a")
        } else if (dataBlog.titulo.length >= 55) {
            alert("El título debe tener como maximo 45 caracteres", "#bb1a1a")
        } else if(JSON.stringify(dataBlog.contenido) === "{}"){
            alert("El blog no puede estar vacio", "#bb1a1a")
        } else if (dataBlog.resumen.length <= 10) {
            alert("La descripción debe de tener un minimo de 10 caracteres", "#bb1a1a")
        } else if (dataBlog.resumen.length > 130) {
            alert("La descripción debe de tener como maximo 130 caracteres", "#bb1a1a")
        } else if(dataBlog.categoria === "") {
            alert("Selecciona una categoria para tu blog", "#bb1a1a")
        }else {
            crearPost(dataBlog)
        }
    }
    return (
            <section className='containerNewBlog'>
                <div className='titleBlogs'>
                    <h2 className='title2'>Crear un nuevo Blog</h2>
                </div>
                <div className='contentNewBlog'>
                    <form onSubmit={handleSubmit} id='formBlog' className='formNewBlog' action="post">
                        <h3 className='subTitle3'>Empieza por darle un titulo a tu blog.</h3>
                        <input
                            onChange={handleInput}
                            type="text"
                            name='titulo'
                            id='title'
                            className='inputNewBlog titleNewBlog'
                            placeholder='Título'
                            autoComplete="off"
                            maxLength={55}
                        />

                        <h3 className='subTitle3'>Redacta el cuerpo de tu blog.</h3>
                        <section className="contenedor">
                            <div className="box">
                                <Yoopta value={value} setValue={setValue} block={false} />
                            </div>
                        </section>

                        <h3 className='subTitle3'>Crea un resumen de tu blog.</h3>
                        <textarea
                            onChange={handleInput}
                            name='resumen'
                            id='resume'
                            className='inputNewBlog resumeNewBlog'
                            cols={10}
                            placeholder='Descripción'
                            maxLength={130}
                            autoComplete="off"
                        />
                        <h3 className='subTitle3'>Selecciona una categoria.</h3>
                        <TagSelector tagSelected={tagSelected} setTag={setTag}/>

                    </form>
                    <button className='btn' form='formBlog' type="submit">Crear</button>
                </div>
            </section>
        )
    }

    export default NewBlog