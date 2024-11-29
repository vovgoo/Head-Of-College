import React, { useEffect, useRef, useState } from 'react';
import { OpenTab } from '../../consts/Icons';

const DropdownInputAccess = ({ title, onChange, value, className }) => {

    const data = {
        "Для всех": "ALL",
        "Только для меня": "ME"
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setIsOpen(false);
        onChange(option)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={` ${className ? className : "w-45 max-sm:w-full max-xl:px-0"} flex flex-col gap-y-2 py-5`}>
            <h1 className='text-lg font-semibold text-wide text-center'>{title}</h1>
            <div className='z-50 w-full relative' ref={dropdownRef}>
                <div
                    onClick={toggleDropdown}
                    className={`flex shadow-beautiful justify-between h-12 items-center py-2 border-gray-400 border-2 bg-white transition-all duration-300 ${isOpen ? "border-green-500" : ""} rounded-xl cursor-pointer gap-x-5 px-5`}
                >
                    <h1 className='font-bold text-gray-500 text-lg h-full'>{value ? Object.entries(data).find(([key, val]) => val === value)[0] : ""}</h1>
                    <OpenTab isOpen={isOpen} className={"fill-gray-500"} />
                </div>
                <div className={`z-50 absolute w-full translate-y-0 mt-2 bg-white border-2 border-gray-400 rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "h-auto" : "h-0 opacity-0"}`}>
                    {data && Object.keys(data).map((key) => (
                        <div
                            key={key}
                            onClick={() => handleSelect(data[key])} 
                            className='px-4 py-2 text-black hover:bg-gray-200 cursor-pointer text-center font-bold transition-all duration-300'
                        >
                            {key} 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownInputAccess;
