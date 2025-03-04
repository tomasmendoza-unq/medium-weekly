import { useState, useEffect } from 'react'
import CommentInput from './CommentInput/CommentInput'
import CommentList from './CommentList/CommentList'
import { Link } from 'react-router-dom';

const Comments = ({ idPost, idAutor, dataPost }) => {
    return (
        <div className='comments'>
            <CommentInput idAutor={idAutor} idPost={idPost} dataPost={dataPost}/>
            <CommentList dataPost={dataPost}/>
        </div>
    )
}

export default Comments
