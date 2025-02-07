import { useState, useEffect } from 'react'
import './Bloglist.css'
import Blogcard from './BlogCard/Blogcard'
import { data } from 'react-router-dom'

const Bloglist = ({ dataPost, visible, clase, claseBC }) => {

    return (
        <div className={clase || "list"} >
            {dataPost.slice(0, visible).map((e) => (
                <Blogcard clase={claseBC} key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo} />
            ))}
        </div>
    )
}

export default Bloglist
