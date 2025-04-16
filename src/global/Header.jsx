import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/TulpstoyLogo.svg";

import "./Header.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('menu-open');
    };

    return (
        <header className="site-header">
            <div className="container">
                <nav className="nav-container">
                    <Link to="/" className="logo-link">
                        <img src={logo} className="logo" alt="Tulpstoy Logo" />
                        <span className="logo-text">Micah Bron Dev</span>
                    </Link>
                    
                    <ul className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Me</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                    </ul>

                    <button 
                        className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;