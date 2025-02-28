import React from 'react'
import './Blogcard.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 

const Blogcard = ({ clase, title, resume, category, src, id, className, onClick }) => {
    const formatCategory = (cat) => {
        return cat
            ? cat.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
            : '';
    }
    return (
        <>
            {sessionStorage.getItem("id") ?
                <Link to={`/blog/${id}`}>
                    <article className={clase || 'card'}>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src || ''} alt={title || ''} />
                            <div className='blogBody'>
                                {category && <p className='category'>{formatCategory(category)}</p>}
                                <h3 className='blogTitle'>{title || ''}</h3>
                                <p className='description'>{resume || ''}</p>
                            </div>
                        </div>
                    </article>
                </Link>
                :
                <Link to='/login'>
                    <article className='block'>
                        <div className='cardCont'>
                            <img className='imgBlog' src={src || ''} alt={title || ''} />
                            <div className='blogBody'>
                                {category && <p className='category'>{formatCategory(category)}</p>}
                                <h3 className='blogTitle'>{title || ''}</h3>
                                <p className='description'>{resume || ''}</p>
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
    onClick: PropTypes.func
}

Blogcard.defaultProps = {
    clase: 'card',
    title: '',
    resume: '',
    category: '',
    src: '',
    id: ''
}

export default Blogcard
