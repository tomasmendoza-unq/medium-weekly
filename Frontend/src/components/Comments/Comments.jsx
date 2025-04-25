import { useState, useEffect } from 'react'
import CommentList from './CommentList/CommentList'
import { Link } from 'react-router-dom';

const Comments = ({ idPost, idAutor, dataPost }) => {
    return (
        <div className='comments'>
            <CommentList dataPost={dataPost}/>
        </div>
    )
}

export default Comments
