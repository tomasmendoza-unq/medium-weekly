import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const year = currentYear === 2023 ? '2023' : `2025 - ${currentYear}`
    return (
        <>
            <div className='footer'>
                <div className="containerFooter">
                    <h2 className='titleFooter'>Medium Weekly | El Valor De Opinar</h2>
                    <div className="divider divFoot"></div>
                    <div className="linksFooter">
                        <Link className='linkFooter' to='/'>Inicio</Link>
                        <Link className='linkFooter' to='/nosotros'>Acerca de nosotros</Link>
                        <Link className='linkFooter' to='/contact'>Contacto</Link>
                    </div>
                    <div className="divider divFoot"></div>
                    <p>Medium Weekly©{year} | All rights reserved</p>
                </div>
            </div>
        </>
    )
}

export default Footer
