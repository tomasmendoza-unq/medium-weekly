import React from 'react'
import './Loading.css'

const Loading = () => {
    return (
        <section className='containerLoading'>
            <div className="spinner"></div>
            <button className='btn' onClick={()=>{location.reload()}}>Recargar la pagina</button>
        </section>
    )
}

export default Loading
