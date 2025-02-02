import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSistrix } from 'react-icons/fa6'

const Search = ({ className }) => {
    const [dataPost, setDataPost] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        fetch("http://localhost:8080/posteos")
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data)
            })
    }, [])
    const handleSearch = (e) => {
        setQuery(e.target.value)
        console.log(dataPost)
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
                <FaSistrix />
            </div>
            {query.length === 0 
                ?
                ""
                : 
                <ul className={className}>
                    {resultadosFiltrados.length > 0 ? (
                        resultadosFiltrados.map(post => (
                            <Link className='postResult' to={`/blog/${post.id_posteo}`} key={post.id_posteo}>{post.titulo}</Link>
                        ))
                    ) : (
                        <p>No se encontraron resultados</p>
                    )}
                </ul> 
            }
        </div>
    )
}

export default Search
