import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col bg-white overflow-hidden">
            <div className="w-full flex-1 flex flex-col mx-auto max-w-[450px]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
