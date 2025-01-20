import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='not-found'>
            <div className='errorContainer'>
                <h1 className='errorTitle'>404</h1>
                <h2 className='errorSubTitle'>Perdón, esta pagina no esta disponible.</h2>
                <p className='errorP'>Es posible que el enlace que siguió esté roto o que la página haya sido eliminada.</p>
                <Link to="/">
                    <button>Inicio</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
