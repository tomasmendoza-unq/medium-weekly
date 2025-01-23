import React from 'react'
import './Blogcard.css'
import { Link } from 'react-router-dom'

const Blogcard = ({ title, resume, src, id }) => {
    return (
        <>
            {sessionStorage.getItem("id") ?
                <Link to={`/blog/${id}`}>
                    <article className='card'>
                        <div className='cardText'>
                            <h3 className='blogTitle'>{title}</h3>
                            <p>{resume}</p>
                        </div>
                        <img className='imgBlog' src={src} alt="" />
                    </article>
                </Link>
                :
                <article className='block'>
                    <div className='cardText'>
                        <h3 className='blogTitle'>{title}</h3>
                        <p>{resume}</p>
                    </div>
                    <img className='imgBlog' src={src} alt="" />
                </article>
                }

        </>
    )
}

export default Blogcard
