import React from 'react'
import './Blogcard.css'
import { Link } from 'react-router-dom'

const Blogcard = ({ clase, title, resume, src, id, className }) => {
    return (
        <>
            {sessionStorage.getItem("id") ?
                <Link to={`/blog/${id}`}>
                    <article className={clase || 'card'}>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src} alt="" />
                            <h3 className='blogTitle'>{title}</h3>
                            <p>{resume}</p>
                        </div>
                    </article>
                </Link>
                :
                <Link to='/login'>
                    <article className='block'>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src} alt="" />
                            <h3 className='blogTitle'>{title}</h3>
                            <p>{resume}</p>
                        </div>
                    </article>
                </Link>
                }

        </>
    )
}

export default Blogcard
