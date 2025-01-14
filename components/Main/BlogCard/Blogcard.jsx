import React from 'react'
import './Blogcard.css'

const Blogcard = ({title, resume}) => {
    return (
        <article className='card'>
            <h3 className='blogTitle'>{title}</h3>
            <p>{resume}</p>
        </article>
    )
}

export default Blogcard
