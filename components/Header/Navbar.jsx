import React from 'react'
import './Navbar.css'
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaSistrix } from "react-icons/fa6";
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
                <Link to="/"><h1>Medium Weekly</h1></Link>
                <section className="tools">
                    <div className='searchBar'>
                        <input type="text" placeholder='Buscar...' />
                        <button><FaSistrix /></button>
                    </div>
                    <div className='buttons'>
                        <Link><FaRegPenToSquare /></Link>
                        <Link to="/login"><FaRegUser /></Link>
                    </div>
                </section>
            </nav>
        </header>
    )
}

export default Navbar
