import { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";

const Comments = ({idPost, idAutor}) => {
    const [input, setInput] = useState("")
    const [read, setRead] = useState(false)
    const [comentario, setComentario] = useState("")
    const [dataComentario, setDataComentario] = useState({
        "text": "",
        "autor": idAutor,
        "post": idPost,
    })

    const handleClick = () => {
        input === "" ? setInput("inpActivated") && setRead(true) : setInput("") && setRead(false)
    }
    const handleInput = (e) => {
        setComentario(e.target.value)
        setDataComentario({...dataComentario, "text": comentario})
    }
    const sendData = ()=> {
        console.log(dataComentario)
    }

    return (
        <div className='comments'>
            <h2 className='subTitleBlog'>Comentarios</h2>
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
                
            </div>
        </div>
    )
}

export default Comments
