import './UserPage.css'
import { useState, useEffect } from 'react'
import Blogcard from '../../components/Main/BlogCard/Blogcard'
import { useParams } from 'react-router-dom'

const UserPage = () => {
    const [dataUser, setDataUser] = useState([])
    const [dataPost, setDataPost] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8080/posteos/user/${id}`) 
            .then((response) => response.json())
            .then((data) => {
                setDataPost(data)
            })
        fetch(`http://localhost:8080/user/${id}`)
            .then((res) => res.json())
            .then((data)=> {
                setDataUser(data)
            })
    }, [])

    const mapData = () => {
        return dataPost.map((e) => {
            return <Blogcard key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo}/>;
        });
    };


    return (
        <div className='containerUser'>
            <section className='userDetails boxUser'>
                <h2 className='fontUser'>{dataUser.nombre}</h2>
                <img className='userImg' src="./img/coffe.png" alt="" />
            </section>
            <section className='userBlogs boxUser'>
                <h2 className='fontUser'>Blogs</h2>
                <div className="list">
                    {mapData()}
                </div>
            </section>
        </div>
    )
}

export default UserPage
