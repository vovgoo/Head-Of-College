import React from 'react';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { AddNote } from '../../../../consts/Icons';
import { fetchDownloadTable } from '../../../../axios/axiosApi';

const TableSearch = ({ dictionary, queryParams, handleQueryParamChange, table }) => {

    const { isVisible, elementRef } = useIntersectionObserver();
    
    const handleClick = async () => {
        const response = await fetchDownloadTable({ table });

        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', `${table}-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileURL);
        console.log(response);
    }   
    
    return (
        <div ref={elementRef} className={`flex max-xl:justify-between max-lg:flex-col max-lg:gap-y-5 max-lg:w-full max-lg:h-full items-end gap-x-5 transition-all duration-1000 ${isVisible ? "" : "translate-x-full opacity-0"}`}>
            <input
                value={queryParams.search}
                onChange={(e) => handleQueryParamChange("search", e.target.value)}
                placeholder="Поиск" type="text" id="large-input" className="max-xl:w-full font-semibold h-12 block w-72 p-4 text-black border-2 border-gray-300 rounded-lg bg-gray-50 text-lg outline-none hover:border-green-500 focus:border-green-500 transition-all duration-300"></input>
            {dictionary?.columns && <Dropdown
                placeholder={dictionary.columns[dictionary.types.indexOf(queryParams.sort)]}
                type={"sort"}
                options={dictionary}
                onSelect={handleQueryParamChange}
            />}
            <Link className='px-10 h-12 max-lg:w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white' to={`/admin/tables/insert/${table}`}>
                <h1 className='whitespace-nowrap font-bold'>Добавить запись</h1>
                <AddNote className={"group-hover:fill-green-500 fill-white transition-all duration-300"}/>
            </Link>
            <button onClick={handleClick} className='font-bold max-lg:w-full text-white whitespace-nowrap px-10 h-12 border-2 border-black bg-black rounded-xl duration-300 transition-all hover:bg-white hover:text-black'>
                Скачать
            </button>
        </div>
    );
};

export default TableSearch;
