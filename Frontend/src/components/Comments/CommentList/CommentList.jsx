import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import CommentInput from '../CommentInput/CommentInput';
import './CommentList.css'

const CommentList = ({ dataPost }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [autor, setAutor] = useState(null);
    const [visible, setVisible] = useState(3);
    const [userDetails, setUserDetails] = useState(null);
    const [comments, setComments] = useState(dataPost.comentarios);
    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            fetch(`${apiUrl}/api/user/details`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then(setUserDetails)
                .catch(console.error);
        }
    }, [apiUrl, token]);

    const handleCommentAdded = (newComment) => {
        setComments(prevComments => [newComment, ...prevComments]);
    };

    const cargarMas = () => {
        setVisible((prevVisible) => prevVisible + 3);
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`${apiUrl}/api/comentario/eliminar/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
    
    return (
        <>
            <CommentInput 
                idPost={dataPost.id_posteo} 
                dataPost={{...dataPost, comentarios: comments}}
                onCommentAdded={handleCommentAdded}
            />
            <div className='viewComments'>
                {comments.length === 0 ?
                    <div className='noComments'>
                        <h2>Sé el primero en dejar un comentario...</h2>
                    </div>
                    :
                    [...comments].slice(0, visible).map((e) => {
                        const isAuthor = userDetails && userDetails.id_usuario === e.autor;
                        return (
                            <div className='comentario' key={e.id}>
                                <div className='infoUserComentario'>
                                    <img src="/img/coffe.png" alt="" className='miniIcon' />
                                    <Link to={`/user/${e.autor}`}>{e.nombreAutor}</Link>
                                    {isAuthor && (
                                        <button 
                                            className="deleteCommentBtn" 
                                            onClick={() => handleDeleteComment(e.id)}
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                                <p>{e.text}</p>
                            </div>
                        );
                    })}
                {comments.length > visible && (
                    <button onClick={cargarMas} className="btn">
                        Ver más...
                    </button>
                )}
            </div>
        </>
    )
}

export default CommentList
