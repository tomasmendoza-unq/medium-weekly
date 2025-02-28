import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './CommentList.css'

const CommentList = ({ dataPost }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dataUser, setDataUser] = useState([])
    const [autor, setAutor] = useState(null);
    const [visible, setVisible] = useState(3);
    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 3);
    }
    
    useEffect(() => {
        fetch(`${apiUrl}/user`)
            .then((res) => res.json())
            .then((e) => { setDataUser(e) })
    }, [])
    return (
        <div className='viewComments'>
            {dataPost.comentarios.length === 0 ?
                <div className='noComments'>
                    <h2>Sé el primero en dejar un comentario...</h2>
                </div>
                :
                dataPost.comentarios.slice(0, visible).map((e) => {
                    const autorComentario = dataUser.find(user => user.id_usuario === e.autor);
                    const nombreAutor = autorComentario ? autorComentario.nombre : 'Anónimo';
                    return (
                        <div className='comentario' key={e.id}>
                            <div className='infoUserComentario'>
                                <img src="/img/coffe.png" alt="" className='miniIcon' />
                                <Link to={`/user/${e.autor}`}>{nombreAutor}</Link>
                            </div>
                            <p>{e.text}</p>
                        </div>
                    );
                })}
            {dataPost.comentarios.length > visible && (
                <button onClick={cargarMas} className="btn">
                    Ver más...
                </button>
            )}
        </div>
    )
}

export default CommentList
