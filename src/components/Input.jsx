import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, maxLength, name, required = true }) => {
    return (
        <div className="w-full flex flex-col items-start gap-1 mb-2.5">
            <label className="text-xs font-semibold text-gray-700 ml-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                required={required}
                className="w-full px-4 py-3 bg-neutral-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-xl text-base outline-none transition-all placeholder:text-gray-400 shadow-sm"
            />
        </div>
    );
};

export default Input;
