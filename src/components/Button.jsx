import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    const baseStyles = "px-6 py-3 rounded-xl text-base font-semibold w-full relative transition-all duration-200 flex justify-center items-center border-none cursor-pointer active:scale-95";

    const variants = {
        primary: "bg-[#3B82F6] text-white hover:bg-[#2563eb] hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-500/20",
        secondary: "bg-neutral-100 text-gray-800 hover:bg-neutral-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            <span className="font-semibold">{children}</span>
        </button>
    );
};

export default Button;
