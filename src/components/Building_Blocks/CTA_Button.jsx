import React from 'react';
import { Link } from 'react-router-dom';
import './CTA_Button.css';

const CTA_Button = ({ 
    to, 
    text, 
    icon, 
    onClick, 
    external = false,
    className = ""
}) => {
    const buttonContent = (
        <>
            {icon && <span className="button-icon">{icon}</span>}
            {text}
        </>
    );

    if (external) {
        return (
            <a 
                href={to} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`cta-button ${className}`}
                onClick={onClick}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <Link 
            to={to} 
            className={`cta-button ${className}`}
            onClick={onClick}
        >
            {buttonContent}
        </Link>
    );
};

export default CTA_Button; 