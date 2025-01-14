import React from 'react'
import './Bloglist.css'
import Blogcard from '../BlogCard/Blogcard'

const Bloglist = () => {
    const blogs = [
        {title: "titulo1", resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis! Perferendis inventore eum ducimus rem, doloribus ipsam laudantium, ullam minima maiores maxime quaerat delectus at natus in, aliquid magnam. Tempore!", id:11},
        {title: "titulo2", resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis! Perferendis inventore eum ducimus rem, doloribus ipsam laudantium, ullam minima maiores maxime quaerat delectus at natus in, aliquid magnam. Tempore!", id:12},
        {title: "titulo3", resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis! Perferendis inventore eum ducimus rem, doloribus ipsam laudantium, ullam minima maiores maxime quaerat delectus at natus in, aliquid magnam. Tempore!", id:13},
        {title: "titulo4", resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis! Perferendis inventore eum ducimus rem, doloribus ipsam laudantium, ullam minima maiores maxime quaerat delectus at natus in, aliquid magnam. Tempore!", id:14},
        {title: "titulo5", resume: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, debitis! Perferendis inventore eum ducimus rem, doloribus ipsam laudantium, ullam minima maiores maxime quaerat delectus at natus in, aliquid magnam. Tempore!", id:15},
    ]
    return (
        <div className='bloglist'>
            <div className='titleBlogs'>
                <h2>Blogs de la semana</h2>
                <div className='underlineTitle'></div>
            </div>
            <div className="list">
                {blogs.map((e)=> (
                    <Blogcard title={e.title} resume={e.resume} key={e.id}/>
                ))}
            </div>
        </div>
    )
}

export default Bloglist
