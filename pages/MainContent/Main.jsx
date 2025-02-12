import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Bloglist from '../../components/Bloglist/Bloglist'
import Loading from '../../components/Loading/Loading'
import FilterByTags from '../../components/FilterByTags/FilterByTags'
import './Main.css'

const Main = () => {
    const { idCategory } = useParams()
    const [dataPost, setDataPost] = useState([])
    const [dataFiltered, setDataFiltered] = useState([])
    const userName = sessionStorage.getItem("user")
    const [visible, setVisible] = useState(5);
    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 5);
    };

    useEffect(() => {
        setDataFiltered(dataPost)
    }, [dataPost])

    useEffect(() => {
        if (idCategory) {
            fetch(`http://localhost:8080/posteos/categoria/${idCategory}`)
                .then((response) => response.json())
                .then((dataFil) => {
                    setDataFiltered(dataFil)
                })
        } else {
            fetch("http://localhost:8080/posteos")
                .then((response) => response.json())
                .then((data) => {
                    setDataPost(data)
                })
            document.title = "Medium Weekly | Inicio"
        }
    }, [idCategory])

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
                    <FilterByTags idParam={idCategory} />
                    <Bloglist visible={visible} dataPost={dataFiltered} />
                    {visible < dataFiltered.length && (
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
