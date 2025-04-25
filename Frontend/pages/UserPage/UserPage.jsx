import './UserPage.css'
import { useState, useEffect } from 'react'
import Blogcard from '../../src/components/Bloglist/BlogCard/Blogcard'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../src/components/Loading/Loading'
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import Cookies from 'js-cookie'
import Modal from '../../src/components/Modal/Modal'

const UserPage = ({ alert }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dataPost, setDataPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({})
    const [adminDetails, setAdminDetails] = useState({})
    const token = Cookies.get("token")
    const { id } = useParams()
    const [modal, setModal] = useState(false)

    const switchModal = () => {
        if (modal) {
            setModal(false)
            document.body.classList.remove('modal-open')
        } else {
            setModal(true)
            document.body.classList.add('modal-open')
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`${apiUrl}/api/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAdminDetails(data);
                document.title = `Medium Weekly | ${data.nombre}`
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
        })
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
        ]).finally(() => {
            setIsLoading(false)
        });
    }, [id])

    useEffect(() => {
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
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    return (
        <div className='containerUser'>
            <Modal title={"Configuración de blogs"} alert={alert} dataPost={dataPost} switchModal={switchModal} modal={modal} content={dataPost.map((e) => (<Blogcard key={e.id_posteo} title={e.titulo || ''} resume={e.resumen || ''} src={e.src || ''} id={e.id_posteo || ''} category={e.categoria || ''} clase='miniCard' admin={userDetails.id_usuario === parseInt(id)} blockLink={true} setDataPost={setDataPost} alert={alert}/>))}/>
            <section className='userDetails boxUser'>
                <div className='infoUser'>
                    <h2 className='fontUser'>{adminDetails.nombre}</h2>
                    <img className='userImg' src="/img/coffe.png" alt="" />
                </div>
                <div className='statsUser'>
                    <h3 className='statsText'><span>Blogs creados:</span> {dataPost.length}</h3>
                    <h3 className='statsText'><span>Id del usuario:</span> {id}</h3>
                </div>
            </section>
            <section className='userBlogs boxUser'>
                <div className='headerBlogContainer'>
                    <h2 className='fontUser'>Blogs</h2>
                    {userDetails.id_usuario === parseInt(id)  ? (
                        <FaGear onClick={switchModal} className='iconGear' />
                    ) : (
                        ""
                    )}
                </div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="listUserPage">
                        {dataPost.length <= 0 ? (
                            <p className='noBlogs'>El usuario no tiene blogs creados...</p>
                        ) : (
                            <>
                                {dataPost.map((e) => (
                                    <Blogcard
                                        key={e.id_posteo}
                                        title={e.titulo || ''}
                                        resume={e.resumen || ''}
                                        src={e.src || ''}
                                        id={e.id_posteo || ''}
                                        category={e.categoria || ''}
                                        clase='miniCard'
                                    />
                                ))}
                                {userDetails.id_usuario === parseInt(id) && (
                                    <article>
                                        <Link to='/newblog'>
                                            <div className='cardNewBlog miniCard'>
                                                <FaRegSquarePlus className='iconNewBlog' />
                                                <h3 className='fontUser'>Nuevo blog</h3>
                                            </div>
                                        </Link>
                                    </article>
                                )}
                            </>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}

export default UserPage