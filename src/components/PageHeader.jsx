import React from 'react';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="bg-[#3B82F6] p-6 pt-10 pb-8 text-center rounded-b-[40px] shadow-lg shadow-blue-500/20">
            <h1 className="text-2xl font-extrabold text-white mb-1">{title}</h1>
            {subtitle && (
                <p className="text-blue-50 text-sm font-medium opacity-90">{subtitle}</p>
            )}
        </div>
    );
};

export default PageHeader;
