import React from 'react';
import '../styles/components/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <div className="content-container">
                {children}
            </div>
        </div>
    );
};

export default Layout;
