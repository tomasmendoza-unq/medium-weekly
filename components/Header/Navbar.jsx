import React from 'react'
import './Navbar.css'
import { FaRegPenToSquare, FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Search from "../Search"

const Navbar = () => {

    const [isShrunk, setIsShrunk] = useState(false);
    const id = sessionStorage.getItem("id")

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
                <Search className={`results ${isShrunk ? "shrinkSearch": ""}`}/>
                    {sessionStorage.getItem('logged') === null ?
                    <div className="menu__bar">
                        <ul className="navigation hide">
                            <li>
                                <button>
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
                            <button>
                                <Link>
                                    <FaRegUser />
                                </Link>
                            </button>
                            <div className="dropdown">
                                <ul className="list-items-with-description">
                                    <li>
                                        <div className="item-title">
                                            <Link to={`/user/${id}`}>
                                                <h3>Ver Perfil</h3>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item-title">
                                            <button onClick={()=>{sessionStorage.clear() ;location.reload()}} className='logout' to="/login">
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
                            <div className="dropdown">
                                <ul className="list-items-with-description">
                                    <li>
                                        <div className="item-title">
                                            <Link to="/newblog">
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
