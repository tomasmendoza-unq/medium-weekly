import './NewBlog.css'
import { useEffect, useState } from 'react'
import Yoopta from '../../components/Yoopta/Yoopta'
import Toastify from 'toastify-js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NewBlog = ({ alert }) => {

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: <p>Estas seguro de crear el blog?</p>,
            icon: "question",
            preConfirm: () => {
                console.log("Creando Blog")
            }
        })
    }

    // ? Función para enviar los datos a la base de datos
    const crearPost = async (blog) => {
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
            alert("Blog creado correctamente", "#1abb1a")
            setTimeout(() => {
                window.location.replace("http://localhost:5174/")
            }, 1000)
        } catch (error) {
            console.error('Error creating post:', error);
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
        "src": './img/coffe.png',
        "idAutor": sessionStorage.getItem('id')
    });

    // ? Funcion para actualizar el contenido a enviar a la BDD
    const updateContent = () => {
        setDataBlog((prev) => ({
            ...prev,
            contenido: JSON.stringify(value),
        }));
    };

    useEffect(() => {
        updateContent();
    }, [value]);

    const handleInput = (e) => {
        setDataBlog({
            ...dataBlog,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Estás seguro de crear el blog?",
            text: "Confirma para subir el blog",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, enviar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                if (dataBlog.titulo.length <= 6) {
                    alert("El título debe tener un minimo de 6 caracteres", "#bb1a1a")
                } else if (dataBlog.titulo.length >= 45) {
                    alert("El título debe tener como maximo 45 caracteres", "#bb1a1a")
                } else if (dataBlog.resumen.length <= 10) {
                    alert("La descripción debe de tener un minimo de 10 caracteres", "#bb1a1a")
                } else if (dataBlog.resumen.length > 130) {
                    alert("La descripción debe de tener como maximo 130 caracteres", "#bb1a1a")
                } else {
                    crearPost(dataBlog)
                }
            }})
        }
    return (
            <section className='containerNewBlog'>
                <div className='titleBlogs'>
                    <h2 className='title2'>Crear un nuevo Blog</h2>
                </div>
                <div className='contentNewBlog'>
                    <form onSubmit={handleSubmit} id='formBlog' className='formNewBlog' action="post">
                        <input
                            onChange={handleInput}
                            type="text"
                            name='titulo'
                            id='title'
                            className='inputNewBlog titleNewBlog'
                            placeholder='Título'
                            autoComplete="off"
                            maxLength={45}
                        />

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
                        <section className="contenedor">
                            <div className="box">
                                <Yoopta value={value} setValue={setValue} block={false} />
                            </div>
                        </section>
                    </form>
                    <button className='btn' form='formBlog' type="submit">Enviar</button>
                </div>
            </section>
        )
    }

    export default NewBlog