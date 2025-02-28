import './UserPage.css'
import { useState, useEffect } from 'react'
import Blogcard from '../../src/components/Bloglist/BlogCard/Blogcard'
import { useParams } from 'react-router-dom'
import Loading from '../../src/components/Loading/Loading'

const UserPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dataUser, setDataUser] = useState([])
    const [dataPost, setDataPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
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
                }),
            fetch(`${apiUrl}/user/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setDataUser(data)
                })
        ]).finally(() => {
            setIsLoading(false)
        });
    }, [id])

    useEffect(() => {
        document.title = `Medium Weekly | ${dataUser.nombre}`
    }, [dataUser])

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
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="list">
                        {dataPost.length <= 0
                            ? <p>El usuario no tiene blogs creados...</p>
                            : dataPost.map((e) => (
                                <Blogcard
                                    key={e.id_posteo}
                                    title={e.titulo || ''}
                                    resume={e.resumen || ''}
                                    src={e.src || ''}
                                    id={e.id_posteo || ''}
                                />
                            ))
                        }
                    </div>
                )}
            </section>
        </div>
    )
}

export default UserPage
