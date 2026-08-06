import React from 'react';
import { Link } from 'react-router-dom';
import './CTA_Button.css';

const CTA_Button = ({
    to,
    text,
    icon,
    onClick,
    external = false,
    variant = "secondary",
    className = ""
}) => {
    const buttonContent = (
        <>
            {icon && <span className="button-icon">{icon}</span>}
            {text}
        </>
    );

    const classes = `cta-button ${variant} ${className}`.trim();

    if (external) {
        return (
            <a
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                onClick={onClick}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <Link
            to={to}
            className={classes}
            onClick={onClick}
        >
            {buttonContent}
        </Link>
    );
};

export default CTA_Button; 