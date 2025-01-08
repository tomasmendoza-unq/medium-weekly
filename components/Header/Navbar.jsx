import React from 'react'
import './Navbar.css'
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaSistrix } from "react-icons/fa6";

const Navbar = () => {
    return (
        <>
            <nav>
                <h1>Medium Weekly</h1>
                <section className="tools">
                    <div className='searchBar'>
                        <input type="text" placeholder='Buscar...' />
                        <button><FaSistrix/></button>
                    </div>
                    <div className='buttons'>
                        <button><FaRegPenToSquare/></button>
                        <button><FaRegUser/></button>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Navbar
