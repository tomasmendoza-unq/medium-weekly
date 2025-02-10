import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Bloglist from '../../components/Bloglist/Bloglist'
import Loading from '../../components/Loading/Loading'
import './Main.css'

const Main = () => {
    const [dataPost, setDataPost] = useState(null)
    const userName = sessionStorage.getItem("user")
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
        document.title = "Medium Weekly | Inicio"
    }, [])

    if (!dataPost) {
        return <Loading />
    }

    return (
        <main>
            <section className='mainContent'>
                {sessionStorage.getItem("logged") === null ?
                    <div className='msgMain'>
                        <p className='textMain'>Bienvenido a Medium Weekly, entra para empezar a leer!</p>
                        <Link to="/login" className='btnLink'>Entrar</Link>
                    </div>
                    :
                    <h2 className="class2 title2">Bienvenido/a <span className='ital'>{userName}</span></h2>}
                <div className='bloglist'>
                    <section className='filterByTags'>
                        
                    </section>
                    <Bloglist visible={visible} dataPost={dataPost} />
                    {visible < dataPost.length && (
                        <button onClick={cargarMas} className="btn">
                            Ver más...
                        </button>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Main
