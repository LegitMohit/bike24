import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="w-full h-full flex justify-center items-center bg-white p-5">
            <div className="w-full max-w-[400px] h-full flex flex-col justify-center items-center text-center gap-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
