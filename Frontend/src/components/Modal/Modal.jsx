import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Modal.css'
import Blogcard from '../Bloglist/BlogCard/Blogcard'

const Modal = ({ alert, switchModal , modal, content, title}) => {
    const { id } = useParams()

    return (
        <div className={modal ? 'modal' : 'hidden'}>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2 className='title2'>{title}</h2>
                    <button onClick={switchModal} className='btnCloseModal'>Cerrar</button>
                </div>
                <div className='modalBody'>
                    {content.length > 0 ? (
                        <>
                        {content}
                        </>
                    ) : (
                        <p className='noBlogs'>No tienes blogs creados...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal
