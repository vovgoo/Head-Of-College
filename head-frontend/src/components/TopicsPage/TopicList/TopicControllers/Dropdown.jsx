import React, { useState, useRef, useEffect } from 'react';
import { OpenTab } from '../../../../consts/Icons';

const Dropdown = ({ options = [], placeholder, width, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setIsOpen(false);
        onSelect(option); 
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
        <div className='z-50 relative max-lg:w-full' ref={dropdownRef} style={{ width }}>
            <div 
                onClick={toggleDropdown}
                className={`flex justify-around max-lg:justify-between items-center py-4 bg-gray-900 border-2 border-gray-600 rounded-xl cursor-pointer px-5 gap-x-5 ${width}`}
            >
                <h1 className='font-bold text-white text-xl'>{placeholder}</h1>
                <OpenTab isOpen={isOpen}/>
            </div>
            <div className={`z-50 absolute w-full ${width} translate-y-0 mt-2 bg-gray-900 border-2 border-gray-600 rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "h-auto" : "h-0 opacity-0"}`}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(option)}
                        className='px-4 py-2 text-white hover:bg-gray-700 cursor-pointer text-center font-bold transition-all duration-300'
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
