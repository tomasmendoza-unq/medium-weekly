import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Bloglist from '../../src/components/Bloglist/Bloglist'
import Loading from '../../src/components/Loading/Loading'
import FilterByTags from '../../src/components/FilterByTags/FilterByTags'
import Cookies from 'js-cookie'
import './Main.css'

const Main = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { idCategory } = useParams()
    const [dataPost, setDataPost] = useState([])
    const [dataFiltered, setDataFiltered] = useState([])
    const userName = Cookies.get("user")
    const [visible, setVisible] = useState(5);
    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 5);
    };

    useEffect(() => {
        setDataFiltered(dataPost)
    }, [dataPost])

    useEffect(() => {
        if (idCategory) {
            fetch(`${apiUrl}/posteos/categoria/${idCategory}`)
                .then((response) => response.json())
                .then((dataFil) => {
                    setDataFiltered(dataFil.reverse())
                })
        } else {
            fetch(`${apiUrl}/posteos`)
                .then((response) => response.json())
                .then((data) => {
                    setDataPost(data.reverse())
                })
            document.title = "Medium Weekly | Inicio"
        }
    }, [idCategory])

    return (
        <main>
            <section className='mainContent'>
                {Cookies.get("logged") === undefined ?
                    <div className='msgMain'>
                        <p className='textMain'>Bienvenido a Medium Weekly, entra para empezar a leer!</p>
                        <Link to="/login" className='btnLink'>Entrar</Link>
                    </div>
                    :
                    <h2 className="class2 title2">Bienvenido/a <span className='ital'>{userName}</span></h2>}
                    <div className='bloglist'>
                        <FilterByTags idParam={idCategory} />
                        {dataFiltered.length === 0 ? (
                            <Loading />
                        ) : (
                            <>
                                <Bloglist visible={visible} dataPost={dataFiltered} Cookies={Cookies} />
                                {visible < dataFiltered.length && (
                                    <button onClick={cargarMas} className="btn">
                                        Ver más...
                                    </button>
                                )}
                            </>
                        )}
                    </div>
            </section>
        </main>
    )
}

export default Main
