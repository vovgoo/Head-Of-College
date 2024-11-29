import React, { useEffect, useState } from 'react';
import InsertInput from '../InsertPage/InsertInput';
import DropdownInputAccess from '../InsertPage/DropdownInputAccess';
import { AddNote } from '../../consts/Icons';
import { useNotification } from "../../context/NotificatIonContext"
import { fetchInsertIntoTable, fetchUpdateIntoTable } from '../../axios/axiosApi';

const NoteCreateUpdate = ({ index, title, description, access, type, onClose, updateNotes }) => {

    const [isVisible, setIsVisible] = useState(false);
    const { showNotification } = useNotification();
    
    const handleCloseWindow = () => {
        onClose();
    }

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 300);
    }, [])

    const [queryParams, setQueryParams] = useState({
        title: title,
        text: description,
        noteAccess: access === "Для всех" ? "ALL" : "ME",
    });
    
    const handleInputChange = (columnType) => (newValue) => {
        setQueryParams((prevDict) => ({
            ...prevDict,
            [columnType]: newValue
        }));
    };

    const handleClick = async () => {
        const params = queryParams;
        
        let date = new Date();
        date.setHours(date.getHours() + 3);
        params["createTime"] = date.toISOString().split('.')[0];

        const table = "заметки";

        try {
            await fetchInsertIntoTable({ table, params });
            
            updateNotes();
            
            showNotification({
                title: "Уведомление",
                message: "Запись успешно добавлена",
                type: "success" 
            });
            
            onClose();
        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Заполните корректно поля",
                type: "error" 
            });
        }
    }

    const handleUpdateClick = async () => {

        const table = "заметки";
        const row = index;

        const params = {};
        params["title"] = queryParams["title"];
        params["text"] = queryParams["text"];
        params["noteAccess"] = queryParams["noteAccess"];

        try {
            await fetchUpdateIntoTable({ table, row, params });

            updateNotes();
            
            showNotification({
                title: "Уведомление",
                message: "Запись успешно обновлена",
                type: "success" 
            });

            onClose();
        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Заполните корректно поля",
                type: "error" 
            });
        }
    }

    return (
        <div className={`fixed max-2xl:z-50 h-dvh w-full top-0 left-0 duration-300 transition-all ${isVisible ? "glass-black" : ""}`}>
            <div className='w-full h-dvh flex items-center justify-center relative'>
                <div onClick={handleCloseWindow} className={`absolute top-10 right-10 transition-all duration-300  ${isVisible ? "" : "opacity-0"}`}>
                    <svg className='fill-white max-sm:fill-black max-sm:z-50 transition-all duration-300 hover:fill-gray-400 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 1024 1024">
                        <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                    </svg>
                </div>

                <div className={`max-sm:w-full max-sm:h-full max-sm:rounded-none flex flex-col rounded-xl px-10 py-10 shadow-beautiful bg-white items-center justify-center transition-all duration-700 ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                    <h1 className='font-bold text-xl mb-5'>Добавление заметки</h1>
                    <div className='flex flex-grow max-sm:flex-grow-0 gap-x-10 max-sm:flex-col'>
                        <InsertInput
                            title={"Заголовок"}
                            type={"String"}
                            value={queryParams.title}
                            onChange={(newValue) => handleInputChange("title")(newValue)} 
                        />
                        <DropdownInputAccess 
                            title={"Режим доступа"} 
                            onChange={(newValue) => handleInputChange("noteAccess")(newValue)} 
                            value={queryParams.noteAccess}
                            className={"w-full"}
                        />
                    </div>
                    <InsertInput
                        title={"Содержание"}
                        type={"String"}
                        value={queryParams.text}
                        onChange={(newValue) => handleInputChange("text")(newValue)} 
                        className={"w-full"}
                    />
                    {type === "insert" ? (
                        <button onClick={handleClick} className="px-10 mt-5 min-h-12 w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white">
                            <h1 className='whitespace-nowrap font-bold'>Добавить запись</h1>
                            <AddNote className={"group-hover:fill-green-500 fill-white transition-all duration-300 max-sm:hidden"}/>
                        </button>
                    ) : (
                        <button onClick={handleUpdateClick} className="px-10 mt-5 min-h-12 w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white">
                            <h1 className='whitespace-nowrap font-bold'>Сохранить измененения</h1>
                            <AddNote className={"group-hover:fill-green-500 fill-white transition-all duration-300 max-sm:hidden"}/>
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default NoteCreateUpdate;
