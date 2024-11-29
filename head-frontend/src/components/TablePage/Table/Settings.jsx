import React, { useRef } from 'react';
import { DeleteRow, UpdateRow } from '../../../consts/Icons';
import { Link } from 'react-router-dom';
import { useNotification } from "../../../context/NotificatIonContext";
import { fetchDeteleIntoTable } from '../../../axios/axiosApi';

const Settings = ({ isOpen, onToggle, id, table, row, updatePage }) => {

    const buttonRef = useRef(null);

    const { showNotification } = useNotification();

    const handleDelete = async () => {

        try {
            await fetchDeteleIntoTable({ table, row });
    
            showNotification({
                title: "Уведомление",
                message: "Запись успешно добавлена",
                type: "success" 
            });

            updatePage();
        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Выберите корректную запись",
                type: "error" 
            });
        }
    }

    return (
        <div className='w-full h-full flex items-center relative justify-center'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => onToggle(id)}
                ref={buttonRef}
                className='cursor-pointer fill-black duration-300 transition-all hover:fill-gray-500'
                width="25px" height="25px" viewBox="0 0 16 16"
            >
                <g>
                    <path d="M8,6.5A1.5,1.5,0,1,0,9.5,8,1.5,1.5,0,0,0,8,6.5Zm5,0A1.5,1.5,0,1,0,14.47,8,1.5,1.5,0,0,0,13,6.5ZM3,6.5A1.5,1.5,0,1,0,4.53,8,1.5,1.5,0,0,0,3,6.5Z" />
                </g>
            </svg>

            {isOpen && (
                <div className="fixed border-gray-300 border-2 bg-gray-50 rounded-lg top-7 z-50"
                    style={{
                        top: `${buttonRef.current.getBoundingClientRect().y + 20}px`,
                        left: `${buttonRef.current.getBoundingClientRect().x - 345}px`
                    }}
                >
                    <ul className='px-5 flex flex-col gap-y-3 py-3 items-center'>
                        <Link to={`/admin/tables/update/${table}/${row}`} className='w-full flex items-center justify-between gap-x-3 group cursor-pointer'>
                            <li className="font-semibold cursor-pointer transition-all duration-300 group-hover:text-blue-500 select-none">Изменить</li>
                            <UpdateRow />
                        </Link>
                        <div onClick={handleDelete} className='w-full flex items-center justify-between gap-x-3 group cursor-pointer'>
                            <li className="font-semibold cursor-pointer transition-all duration-300 group-hover:text-red-500 select-none">Удалить</li>
                            <DeleteRow />
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Settings;
