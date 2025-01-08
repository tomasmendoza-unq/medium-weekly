import React from 'react'
import './Bloglist.css'
import Blogcard from '../BlogCard/Blogcard'

const Bloglist = () => {
    return (
        <div className='bloglist'>
            <div className='titleBlogs'>
                <h2>Blogs de la semana</h2>
                <div className='underlineTitle'></div>
            </div>
            <div className="list">
                <Blogcard/>
            </div>
        </div>
    )
}

export default Bloglist
