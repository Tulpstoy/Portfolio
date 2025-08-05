import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <p className="made-with">
                        <span className="handwritten-text">Hand-coded with TLC</span>
                    </p>
                </div>
                
                <div className="footer-column">
                    <h3>Follow me @</h3>
                    <div className="social-links">
                        <a href="https://www.instagram.com/tulpstoy" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <a href="https://www.linkedin.com/in/vandertulp" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href="https://github.com/Tulpstoy" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </div>
                
                <div className="footer-column">
                    <p className="copyright">
                        <span className="roboto-text">©</span> <span className="handwritten-text">Micah Bron</span> <span className="handwritten-text">twenty-twenty-five</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;