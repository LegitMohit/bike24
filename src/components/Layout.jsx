import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="w-full flex-1 min-h-0 flex flex-col mx-auto max-w-[450px]">
                {children}
            </div>
        </div>
    );
};

export default Layout;
