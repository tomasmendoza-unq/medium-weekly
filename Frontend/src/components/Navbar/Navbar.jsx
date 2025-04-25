import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { FaRegPenToSquare, FaRegUser, FaQuoteRight, FaArrowRightToBracket } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Search from "./Search"
import Cookies from 'js-cookie'

const NavMenuItem = ({ icon: Icon, text, to, onClick, className = '' }) => (
    <li>
        <button className={className} onClick={onClick}>
            <Link to={to}>
                {Icon && <Icon />}
                {text && <p className='pLink'>{text}</p>}
            </Link>
        </button>
    </li>
);

const Navbar = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();
    
    const webUrl = import.meta.env.VITE_WEB_URL;
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = Cookies.get("token");

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (token) {
            fetch(`${apiUrl}/api/user/details`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then(setUserDetails)
                .catch(console.error);
        }
    }, [apiUrl, token]);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error(`Error en logout: ${response.status}`);
            }
            
            Object.keys(Cookies.get()).forEach(Cookies.remove);
            window.location.href = webUrl;
        } catch (error) {
            console.error("Error en logout:", error);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const renderAuthenticatedMenu = () => (
        <div className="menu__bar">
            {isMenuOpen ? (
                <ul className="navigation hide">
                    <NavMenuItem 
                        icon={IoCloseOutline} 
                        text="Cerrar" 
                        onClick={toggleMenu} 
                        className='userBtn'
                    />
                    <NavMenuItem 
                        icon={FaRegUser} 
                        text="Ver Perfil" 
                        to={`/user/${userDetails.id_usuario}`} 
                        onClick={toggleMenu}
                        className="userBtn"
                    />
                    <NavMenuItem 
                        icon={FaRegPenToSquare} 
                        text="Redactar un Blog" 
                        to="/newblog" 
                        onClick={toggleMenu}
                        className="userBtn"
                    />
                    <NavMenuItem 
                        icon={FaArrowRightToBracket} 
                        text="LogOut" 
                        onClick={handleLogout}
                        className="userBtn"
                    />
                </ul>
            ) : (
                <ul className="navigation hide">
                    <li className="user-dropdown">
                        <button className='userBtn'>
                            <FaRegUser />
                        </button>
                        <div className="dropdown">
                            <ul className="list-items-with-description">
                                <NavMenuItem 
                                    text="Ver Perfil"
                                    to={`/user/${userDetails.id_usuario}`}
                                    className='viewProfileBtn userBtn'
                                />
                                <li>
                                    <div className="item-title">
                                        <button onClick={handleLogout} className='logout'>
                                            <h3>LogOut</h3>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <NavMenuItem icon={FaRegPenToSquare} to="/newblog" />
                </ul>
            )}
        </div>
    );

    const renderUnauthenticatedMenu = () => (
        <div className="menu__bar">
            {isMenuOpen ? (
                <ul className='navigation hide'>
                    <NavMenuItem
                        icon={IoCloseOutline} 
                        text="Cerrar" 
                        onClick={toggleMenu} 
                    />
                    <NavMenuItem 
                        icon={FaRegUser} 
                        text="Entrar" 
                        to="/login" 
                        onClick={toggleMenu}
                        className="userBtn"
                    />
                </ul>
            ) : (
                <ul className='navigation hide'>
                    <NavMenuItem icon={FaRegUser} to="/login" />
                </ul>
            )}
        </div>
    );

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
                    <Search 
                        toggleMenu={toggleMenu} 
                        className={`results ${isShrunk ? "shrinkSearch": ""}`}
                    />
                    {token ? renderAuthenticatedMenu() : renderUnauthenticatedMenu()}
                </section>
            </nav>
        </header>
    );
};

export default Navbar;
