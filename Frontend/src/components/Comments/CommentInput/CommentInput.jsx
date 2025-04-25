import { useState, useEffect } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import Cookies from 'js-cookie'
import './CommentInput.css'

const CommentInput = ({ idPost, dataPost, onCommentAdded }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [comentario, setComentario] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [read, setRead] = useState(false)
    const [input, setInput] = useState("")
    const [dataComentario, setDataComentario] = useState({
        text: "",
        post: idPost,
        autor: null
    })

    const sendPost = async (comentario) => {
        try {
            const response = await fetch(`${apiUrl}/api/comentario/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify(comentario),
            });
            if (!response.ok) {
                throw new Error('Error al crear comentario');
            }
            const newComment = await response.json();
            newComment.nombreAutor = userDetails.nombre;
            onCommentAdded(newComment);
            setComentario("");
            setInput("");
            setRead(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    const handleClick = () => {
        if (input === "") {
            setInput("inpActivated");
            setRead(false);
        } else {
            setInput("");
            setRead(true);
        }
    }

    const handleInput = (e) => {
        setComentario(e.target.value)
    }

    const sendData = () => {
        if (comentario.trim() === "" || !userDetails.id_usuario) return;
        
        const commentData = {
            text: comentario,
            autor: userDetails.id_usuario,
            post: idPost
        };
        sendPost(commentData);
    };

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            fetch(`${apiUrl}/api/user/details`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserDetails(data)
                    setDataComentario(prev => ({
                        ...prev,
                        autor: data.id_usuario
                    }));
                })
        }
    }, [])

    return (
        <>
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
                        value={comentario}
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
            <h2 className='subTitleBlog'>Comentarios ({dataPost.comentarios.length})</h2>
        </>
    )
}

export default CommentInput
