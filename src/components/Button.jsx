import React from 'react';
import '../styles/components/Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    return (
        <button
            className={`custom-button ${variant} ${className}`}
            onClick={onClick}
        >
            <span className="button-text">{children}</span>
        </button>
    );
};

export default Button;
