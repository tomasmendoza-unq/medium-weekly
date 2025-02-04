import { useState } from 'react'

const Comments = () => {
    const [input, setInput] = useState("")
    const handleClick = () => {
        setInput("inpActivated")
    }

    return (
        <div className='comments'>
            <h2 className='subTitleBlog'>Opiniones de los usuarios</h2>
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
                    ></textarea>
                    <div className='toolsComments'>
                        <button className='cancel' onClick={()=> {setInput("")}}>Cancelar</button>
                        <button className='send'>Enviar</button>
                    </div>
                </div>
            </div>
            <div className='viewComments'>
                
            </div>
        </div>
    )
}

export default Comments
