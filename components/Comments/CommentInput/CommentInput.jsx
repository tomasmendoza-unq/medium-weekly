import { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import './CommentInput.css'

const CommentInput = ({ idAutor, idPost, dataPost }) => {
    const [comentario, setComentario] = useState("")
    const [read, setRead] = useState(false)
    const [input, setInput] = useState("")
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
    return (
        <>
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
        </>
    )
}

export default CommentInput
