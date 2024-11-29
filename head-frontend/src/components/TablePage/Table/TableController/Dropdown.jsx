import React, { useState, useRef, useEffect } from 'react';
import { OpenTab } from '../../../../consts/Icons';

const Dropdown = ({ options = [], placeholder, onSelect, type }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setIsOpen(false);
        onSelect(type, options.types[options.columns.indexOf(option)]); 
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
        <div className='z-50 w-full relative' ref={dropdownRef}>
            <div 
                onClick={toggleDropdown}
                className={`flex justify-between h-12 items-center py-2 border-gray-300 border-2 bg-gray-50 transition-all duration-300 ${isOpen ? "border-green-500" : ""} rounded-xl cursor-pointer gap-x-5 px-5`}
            >
                <h1 className='font-bold text-gray-500 text-lg h-full'>{placeholder}</h1>
                <OpenTab isOpen={isOpen} className={"fill-gray-500"}/>
            </div>
            <div className={`z-50 absolute w-full translate-y-0 mt-2 bg-white border-2 border-gray-400 rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "h-auto" : "h-0 opacity-0"}`}>
                {options?.columns.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(option)}
                        className='px-4 py-2 text-black hover:bg-gray-200 cursor-pointer text-center font-bold transition-all duration-300'
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
