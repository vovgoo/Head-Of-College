import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OpenTab } from '../../consts/Icons';
import useFetchData from '../../hooks/useFetchData';
import { fetchSearchDropdown } from '../../axios/axiosApi';

const DropdownInput = ({ title, table, dataType, onChange, value }) => {

    const [queryParams, setQueryParams] = useState({
        table: null,
        params: " ",
    });

    const { data } = useFetchData(fetchSearchDropdown, queryParams);

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => {
            let newParams = { ...prev, [key]: value };
            return newParams;
        });
    }, []);

    useEffect(() => {

        const tables = {
            "Group": "группы",
            "Speciality": "специальности",
            "Students": "студенты"
        }

        handleQueryParamChange("table", tables[dataType]);
    }, [table, handleQueryParamChange, dataType])

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setIsOpen(false);
        onChange({
            id: Number(option),
            title: data[option]
        })
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
        <div className='w-45 max-sm:w-full flex flex-col gap-y-2 py-5'>
            <h1 className='text-lg font-semibold text-wide text-center'>{title}</h1>
            <div className='z-50 w-full relative' ref={dropdownRef}>
                <div
                    onClick={toggleDropdown}
                    className={`flex shadow-beautiful justify-between h-12 items-center py-2 border-gray-400 border-2 bg-white transition-all duration-300 ${isOpen ? "border-green-500" : ""} rounded-xl cursor-pointer gap-x-5 px-5`}
                >
                    <h1 className='font-bold text-gray-500 text-lg h-full'>{value?.title ? value.title : " "}</h1>
                    <OpenTab isOpen={isOpen} className={"fill-gray-500"} />
                </div>
                <div className={`z-50 absolute w-full translate-y-0 mt-2 bg-white border-2 border-gray-400 rounded-xl shadow-lg transition-all overflow-y-scroll duration-300 overflow-hidden ${isOpen ? "h-72" : "h-0 opacity-0"}`}>
                    <div className='w-full px-5 py-2'>
                        <h1 className='w-full text-center text-lg font-bold my-2'>Поиск</h1>
                        <input value={queryParams["params"]} onChange={(e) => handleQueryParamChange("params", e.target.value)} placeholder='Введите значение' type="text" className='w-full h-full rounded-xl border-gray-400 outline-none border-2 text-lg font-semibold px-5 py-3 duration-300 transition-all hover:border-green-500 focus:border-green-500' />
                    </div>
                    {data && Object.keys(data).map((key) => (
                        <div
                            key={key}
                            onClick={() => handleSelect(key)} 
                            className='px-4 py-2 text-black hover:bg-gray-200 cursor-pointer text-center font-bold transition-all duration-300'
                        >
                            {data[key]} 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownInput;
