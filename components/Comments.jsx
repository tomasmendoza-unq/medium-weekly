import { useState, useEffect } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Comments = ({ idPost, idAutor, dataPost }) => {
    const [input, setInput] = useState("")
    const [read, setRead] = useState(false)
    const [comentario, setComentario] = useState("")
    const [dataUser, setDataUser] = useState([])
    const [autor, setAutor] = useState(null);
    const [dataComentario, setDataComentario] = useState({
        "text": "",
        "autor": idAutor,
        "post": idPost,
    })
    const sendPost = async (comentario) => {
        try {
            const response = await fetch('http://localhost:8080/comentario/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comentario),
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const [visible, setVisible] = useState(3);
    
    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 3);
    }

    const handleClick = () => {
        input === "" ? setInput("inpActivated") && setRead(true) : setInput("") && setRead(false)
    }
    const handleInput = (e) => {
        setComentario(e.target.value)
        setDataComentario({ ...dataComentario, "text": comentario })
    }
    const sendData = () => {
        setDataComentario({ ...dataComentario, "text": comentario });
        sendPost(dataComentario)
        location.reload()
    };

    useEffect(() => {
        fetch("http://localhost:8080/user")
            .then((res) => res.json())
            .then((e) => { setDataUser(e) })
    }, [])
    return (
        <div className='comments'>
            <h2 className='subTitleBlog'>Comentarios ({dataPost.comentarios.length})</h2>
            <div className='writeComment'>
                <div className='createComment' onClick={handleClick}>
                    <p>¿Que opinas?</p>
                </div>
                <div className={`containerComments ${input}`}>
                    <textarea
                        name=""
                        id=""
                        className="inputComment"
                        placeholder='¿Que opinas?'
                        readOnly={read}
                        maxLength={255}
                        onChange={handleInput}
                    ></textarea>
                    <div className='toolsComments'>
                        <p className='lenght'>{comentario.length}/255</p>
                        <div className='buttonsComentarios'>
                            <button className='cancel' onClick={handleClick}><FaRegTrashCan /></button>
                            <button className='send' onClick={sendData}><FaPaperPlane /></button>
                        </div>
                    </div>
                </div>
            </div>
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
                                    <img src="" alt="" className='miniIcon' />
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
        </div>
    )
}

export default Comments
