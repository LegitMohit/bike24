import React from 'react';
import '../styles/components/Logo.css';
import logoImg from '../assets/logo.png';

const Logo = () => {
    return (
        <div className="logo-section">
            <div className="logo-container">
                <img src={logoImg} alt="BikeAuction Logo" className="logo-image" />
            </div>
            <div className="brand-info">
                <h1 className="brand-name">BikeAuction</h1>
                <p className="brand-tagline">Sell your bike fast</p>
            </div>
        </div>
    );
};

export default Logo;
