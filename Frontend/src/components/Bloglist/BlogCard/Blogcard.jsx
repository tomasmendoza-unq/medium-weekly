import React from 'react'
import './Blogcard.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import Cookies from 'js-cookie'

const Blogcard = ({ 
    clase = 'card',
    title = '',
    resume = '',
    category = '',
    src = '',
    id = '',
    setDataPost,
    className,
    onClick,
    admin,
    blockLink,
    alert
}) => {
    const apiUrl = import.meta.env.VITE_API_URL
    const token = Cookies.get("token");

    const formatCategory = (cat) => {
        return cat
            ? cat.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
            : '';
    }

    const deletePost = (id) => {
        fetch(`${apiUrl}/api/eliminar/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    setDataPost((prevPosts) => prevPosts.filter((post) => post.id_posteo !== id));
                    alert("Post deleted successfully", "#1abb9c")
                } else {
                    alert("Error deleting post", "#bb1a1a")
                }
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
                alert("Error deleting post", "#bb1a1a")
            });
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        deletePost(id)
    }
    
    return (
        <>
            {Cookies.get("token") ?
                <Link to={blockLink ? '#' : `/blog/${id}`}>
                    <article className={clase}>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src} alt={title} />
                            <div className='blogBody'>
                                <div className='headerCard'>
                                    {category && <p className='category'>{formatCategory(category)}</p>}
                                    <div className='btnCont'>
                                        {admin && <button className='btnCard del' onClick={handleDelete}><FaRegTrashCan className='btnCard'/></button>}
                                    </div>
                                </div>

                                <h3 className='blogTitle'>{title}</h3>
                                <p className='description'>{resume}</p>
                            </div>
                        </div>
                    </article>
                </Link>
                :
                <Link to='/login'>
                    <article className='block'>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src} alt={title} />
                            <div className='blogBody'>
                                <div className='headerCard'>
                                    {category && <p className='category'>{formatCategory(category)}</p>}
                                </div>
                                <h3 className='blogTitle'>{title}</h3>
                                <p className='description'>{resume}</p>
                            </div>
                        </div>
                    </article>
                </Link>
            }
        </>
    )
}

Blogcard.propTypes = {
    clase: PropTypes.string,
    title: PropTypes.string,
    resume: PropTypes.string,
    category: PropTypes.string,
    src: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    onClick: PropTypes.func,
}

export default Blogcard