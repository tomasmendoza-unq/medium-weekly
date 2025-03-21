import './UserPage.css'
import { useState, useEffect } from 'react'
import Blogcard from '../../src/components/Bloglist/BlogCard/Blogcard'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../src/components/Loading/Loading'
import { FaRegSquarePlus } from "react-icons/fa6";
import Cookies from 'js-cookie'

const UserPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dataUser, setDataUser] = useState([])
    const [dataPost, setDataPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({})
    const { id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            fetch(`${apiUrl}/public/posteos/user/${id}`)
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
            fetch(`${apiUrl}/api/user/details`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
            )
                .then((res) => res.json())
                .then((data) => {
                    setDataUser(data)
                })
        ]).finally(() => {
            setIsLoading(false)
        });
    }, [id])

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            fetch(`${apiUrl}/api/user/details`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserDetails(data);
                })
        }
    }, [])

    useEffect(() => {
        document.title = `Medium Weekly | ${dataUser.nombre}`
    }, [dataUser])

    return (
        <div className='containerUser'>
            <section className='userDetails boxUser'>
                <div className='infoUser'>
                    <h2 className='fontUser'>//Nombre de usuario</h2>
                    <img className='userImg' src="/img/coffe.png" alt="" />
                </div>
                <div className='statsUser'>
                    <h3 className='statsText'><span>Blogs creados:</span> {dataPost.length}</h3>
                    <h3 className='statsText'><span>Id del usuario:</span> {id}</h3>
                </div>
            </section>
            <section className='userBlogs boxUser'>
                <h2 className='fontUser'>Blogs</h2>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="listUserPage">
                        {
                            dataPost.length <= 0
                                ?
                                <p>El usuario no tiene blogs creados...</p>
                                :
                                (dataPost.map((e) => (
                                    <Blogcard
                                        key={e.id_posteo}
                                        title={e.titulo || ''}
                                        resume={e.resumen || ''}
                                        src={e.src || ''}
                                        id={e.id_posteo || ''}
                                        clase='miniCard'
                                    />
                                ))
                                
                            )
                        }
                        {
                            userDetails.id_usuario === parseInt(id)
                                ?
                                <article>
                                    <Link to='/newblog'>
                                        <div className='cardNewBlog miniCard'>
                                            <FaRegSquarePlus className='iconNewBlog' />
                                            <h3 className='fontUser'>Nuevo blog</h3>
                                        </div>
                                    </Link>
                                </article>
                                :
                                null
                        }
                    </div>
                )}
            </section>
        </div>
    )
}

export default UserPage
