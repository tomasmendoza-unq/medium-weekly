import './UserPage.css'
import { useState, useEffect } from 'react'
import Blogcard from '../../components/Bloglist/BlogCard/Blogcard'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
const apiUrl = process.env.REACT_APP_API_URL;

const UserPage = () => {
    const [dataUser, setDataUser] = useState([])
    const [dataPost, setDataPost] = useState([])
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`${apiUrl}/posteos/user/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setDataPost(data);
                } else {
                    setDataPost([data]);
                }
            })
            .catch(error => {
                setDataPost([])
            });

        fetch(`http://localhost:8080/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setDataUser(data)
            })
    }, [id])


    const mapData = () => {
        return dataPost.map((e) => {
            return <Blogcard key={e.id_posteo} title={e.titulo} resume={e.resumen} src={e.src} id={e.id_posteo} />;
        });
    };

    useEffect(() => {
        document.title = `Medium Weekly | ${dataUser.nombre}`
    }, [dataUser])

    if (error === true) {
        return <Loading />
    }
    return (
        <div className='containerUser'>
            <section className='userDetails boxUser'>
                <div className='infoUser'>
                    <h2 className='fontUser'>{dataUser.nombre}</h2>
                    <img className='userImg' src="/img/coffe.png" alt="" />
                </div>
                <div className='statsUser'>
                    <h3 className='statsText'><span>Blogs creados:</span> {dataPost.length}</h3>
                    <h3 className='statsText'><span>Id del usuario:</span> {dataUser.id_usuario}</h3>
                </div>
            </section>
            <section className='userBlogs boxUser'>
                <h2 className='fontUser'>Blogs</h2>
                <div className="list">
                    {dataPost.length <= 0
                        ?
                        <p>El usuario no Tiene blogs creados...</p>
                        :
                        mapData()
                    }
                </div>
            </section>
        </div>
    )
}

export default UserPage
