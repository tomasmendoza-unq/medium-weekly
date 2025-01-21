import React from 'react'
import './Navbar.css'
import { FaRegPenToSquare, FaRegUser, FaSistrix } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isShrunk ? "shrink" : ""}`}>
            <nav>
                <Link to="/"><h1 className='title1'>Medium Weekly</h1></Link>
                <section className="tools">
                    <div className='searchBar'>
                        <input type="text" placeholder='Buscar...' />
                        <button className='btn'><FaSistrix /></button>
                    </div>
                    {sessionStorage.getItem('logged') === null ?
                    <div className="menu__bar">
                        <ul className="navigation hide">
                            <li>
                                <button className='btn'>
                                    <Link to="/login">
                                        <FaRegUser />
                                    </Link>
                                </button>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="menu__bar">
                    <ul className="navigation hide">
                        <li>
                            <button className='btn'>
                                <Link>
                                    <FaRegUser />
                                </Link>
                            </button>
                            <div className="dropdown">
                                <ul className="list-items-with-description">
                                    <li>
                                        <div className="item-title">
                                            <Link to="/login">
                                                <h3>Ver Perfil</h3>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-title">
                                            <Link className='logout' to="/login">
                                                <h3>LogOut</h3>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button className='btn'>
                                <Link to="/login">
                                    <FaRegPenToSquare />
                                </Link>
                            </button>
                            <div className="dropdown">
                                <ul className="list-items-with-description">
                                    <li>
                                        <div className="item-title">
                                            <Link to="/login">
                                                <h3>Redactar</h3>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    </div>
                    }
                </section>
            </nav>
        </header>
    )
}

export default Navbar
