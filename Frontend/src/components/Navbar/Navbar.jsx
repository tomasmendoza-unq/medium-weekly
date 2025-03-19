import React from 'react'
import './Navbar.css'
import { FaRegPenToSquare, FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaQuoteRight } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Search from "./Search"
import Cookies from 'js-cookie'

const Navbar = () => {

    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const webUrl = import.meta.env.VITE_WEB_URL;
    const apiUrl = import.meta.env.VITE_API_URL;

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const clearCookies = () => {
        Object.keys(Cookies.get()).forEach(cookie => {
            Cookies.remove(cookie);
        });
    }

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error en logout: ${response.status} ${response.statusText}`);
            }
            clearCookies();
            window.location.href = webUrl;
        } catch (error) {
            console.error("Error en logout:", error);
        }
    };

    return (
        <header className={`header ${isShrunk ? "shrink" : ""}`}>
            <nav>
                <Link className='logo' to="/">
                    <h1 className='title1'>Medium Weekly</h1>
                    <FaQuoteRight color='#dee9e5'/>
                </Link>
                <div className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <section className={`tools ${isMenuOpen ? 'active' : ''}`}>
                <Search toggleMenu={toggleMenu} className={`results ${isShrunk ? "shrinkSearch": ""}`}/>
                    {Cookies.get('token') === undefined ?
                    <div className="menu__bar">
                            {isMenuOpen 
                            ?
                            <ul className='navigation hide'>
                                <li>
                                    <button onClick={toggleMenu}>
                                        <IoCloseOutline/>
                                        <p className='pLink'>Cerrar</p>
                                    </button>
                                </li>
                                <li>
                                    <button className='userBtn'>
                                        <Link onClick={toggleMenu} to={`/login`}>
                                            <FaRegUser />
                                            <p className='pLink'>Entrar</p>
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                            :
                            <ul className='navigation hide'>
                                <li>
                                    <button>
                                        <Link to="/login">
                                            <FaRegUser />
                                        </Link>
                                    </button>
                                </li>
                            </ul>}
                    </div>
                    :
                    <div className="menu__bar">
                        {isMenuOpen ?
                            <ul className="navigation hide">
                                <li>
                                    <button className='userBtn' onClick={toggleMenu}>
                                        <Link>
                                            <IoCloseOutline/>
                                            <p className='pLink'>Cerrar</p>
                                        </Link>
                                    </button>
                                </li>
                                <li>
                                    <button className='userBtn'>
                                        <Link onClick={toggleMenu} to={`/user/1`}>
                                            <FaRegUser />
                                            <p className='pLink'>Ver Perfil</p>
                                        </Link>
                                    </button>
                                </li>
                                <li>
                                    <button className='userBtn'>
                                        <Link onClick={toggleMenu} to="/newblog">
                                            <FaRegPenToSquare />
                                            <p className='pLink'>Redactar un Blog</p>
                                        </Link>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className='userBtn'>
                                        <Link>
                                            <FaArrowRightToBracket/>
                                            <p className='pLink'>LogOut</p>
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                        :
                            <ul className="navigation hide">
                                <li>
                                    <button className='userBtn'>
                                        <Link>
                                            <FaRegUser />
                                        </Link>
                                    </button>
                                    <div className="dropdown">
                                        <ul className="list-items-with-description">
                                            <li>
                                                <div className="item-title">
                                                    <Link to={`/user/1`}>
                                                        <h3>Ver Perfil</h3>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="item-title">
                                                    <button onClick={handleLogout} className='logout' to="/login">
                                                        <h3>LogOut</h3>
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <button>
                                        <Link to="/newblog">
                                            <FaRegPenToSquare />
                                        </Link>
                                    </button>
                                </li>
                            </ul>}
                    </div>
                    }
                </section>
            </nav>
        </header>
    )
}

export default Navbar
