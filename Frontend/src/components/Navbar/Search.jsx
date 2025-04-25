import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Search = ({ className, toggleMenu }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dataPost, setDataPost] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        fetch(`${apiUrl}/public/posteos`)
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data)
            })
    }, [])
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    const resultadosFiltrados = dataPost.filter(post =>
        post.titulo.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className='search'>
            <div className='searchBar'>
                <input
                    className='input'
                    type="text"
                    placeholder='Buscar...'
                    onChange={handleSearch}
                />
            </div>
            {
                Cookies.get("logged") === "true"
                    ?
                    query.length === 0
                        ?
                        ""
                        :
                        <ul className={className}>
                            {
                                resultadosFiltrados.length > 0
                                    ?
                                    (resultadosFiltrados.slice(0, 5).map(post => (
                                        <Link onClick={window.innerWidth < 800 ? toggleMenu : null} className='postResult' to={`/blog/${post.id_posteo}`} key={post.id_posteo}><img src={post.src} alt="" />{post.titulo}</Link>
                                    ))
                                    )
                                    :
                                    (
                                        <h3>No se encontraron resultados...</h3>
                                    )}
                        </ul>
                    :
                    query.length === 0
                        ?
                        ""
                        :
                        <ul className={className}>
                            {
                                resultadosFiltrados.length > 0
                                    ?
                                    (resultadosFiltrados.slice(0, 5).map(post => (
                                        <p onClick={toggleMenu} className='postResult' key={post.id_posteo}><img src={post.src} alt="" />{post.titulo}</p>
                                    ))
                                    )
                                    :
                                    (
                                        <p>No se encontraron resultados</p>
                                    )}
                        </ul>
            }
            {

            }
        </div>
    )
}

export default Search
