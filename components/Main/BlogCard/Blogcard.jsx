import React from 'react'
import './Blogcard.css'

const Blogcard = ({title, resume}) => {
    return (
        <article className='card'>
            <div className='cardText'>
                <h3 className='blogTitle'>{title}</h3>
                <p>{resume}</p>
            </div>
            <img className='imgBlog' src="" alt="" />
        </article>
    )
}

export default Blogcard
