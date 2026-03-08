import React from 'react';
import logoImg from '../assets/logo.png';

const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-[180px] h-[180px] bg-slate-50 border-4 border-[#3B82F6] rounded-[45px] flex justify-center items-center overflow-hidden shadow-[0_8px_0_rgba(59,130,246,0.1)]">
                <img src={logoImg} alt="BikeAuction Logo" className="w-full h-full object-contain" />
            </div>
            <div className="mt-2.5 text-center">
                <h1 className="text-4xl font-extrabold text-[#3B82F6] leading-none mb-1 tracking-tighter">BikeAuction</h1>
                <p className="font-montserrat text-lg font-medium text-gray-500">Sell your bike fast</p>
            </div>
        </div>
    );
};

export default Logo;
