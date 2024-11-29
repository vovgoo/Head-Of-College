import React, { useEffect, useState } from "react";
import Notes from "../components/Dashboard/Notes/Notes";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { fetchImageUpload, fetchInsert, fetchInsertIntoTable } from "../axios/axiosApi";
import { AddNote } from "../consts/Icons";
import InsertInput from "../components/InsertPage/InsertInput";
import DropdownInput from "../components/InsertPage/DropdownInput";
import DropdownInputAccess from "../components/InsertPage/DropdownInputAccess";
import { useNotification } from "../context/NotificatIonContext";

const InsertPage = () => {

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const { table } = useParams();

    const [queryParams, setQueryParams] = useState({ table });

    const { data } = useFetchData(fetchInsert, queryParams);

    const handleQueryParamChange = (key, value) => setQueryParams((prev) => ({ ...prev, [key]: value }));

    useEffect(() => handleQueryParamChange("table", table), [table]);

    const [dictionary, setDictionary] = useState({});

    useEffect(() => {
        if (data?.columns) {  
            const newDictionary = data.columns.reduce((acc, item) => {
                if(item.columnType === "image") {
                    acc[`"${item.columnType}"`] = null;
                } else {
                    acc[`"${item.columnType}"`] = "";
                }
                return acc;
            }, {});
            if(table === "пользователи") {
                newDictionary[`"password"`] = "";
                delete newDictionary[`"role"`];
            }
            setDictionary(newDictionary);
        }
    }, [data, table]);

    const handleInputChange = (columnType) => (newValue) => {
        setDictionary((prevDict) => ({
            ...prevDict,
            [columnType]: newValue  
        }));

        console.log(dictionary);
    };

    const { isVisible, elementRef } = useIntersectionObserver();

    const handleClick = async () => {
        const params = {};
        for (const column of data.columns) {
            if(column.dataType === "Integer" || column.dataType  === "Long") {
                params[column.columnType] = parseInt(dictionary[`"${column.columnType}"`]);
            } else if(column.dataType === "Double") {
                params[column.columnType] = parseFloat(dictionary[`"${column.columnType}"`]);
            } else if(column.columnName.startsWith("id_")) {
                params[column.columnType] = parseInt(dictionary[`"${column.columnType}"`].id);    
            } else if(column.columnType.startsWith("image")) {
                if(dictionary[`"${column.columnType}"`] != null) {
                    params[column.columnType] = dictionary[`"${column.columnType}"`].name;
                }
            } else {
                params[column.columnType] = dictionary[`"${column.columnType}"`];
            }
        }

        if(table === "пользователи") {
            params["password"] = dictionary[`"password"`];
        }
        
        try {
            await fetchInsertIntoTable({ table, params });
            if(dictionary[`"image"`] != null) {
                const formData = base64ToFormData(dictionary[`"image"`].photo, dictionary[`"image"`].name);
                await fetchImageUpload(formData);
            }
            
            showNotification({
                title: "Уведомление",
                message: "Запись успешно добавлена",
                type: "success" 
            });

            navigate(`/admin/tables/${table}`);
        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Заполните корректно поля",
                type: "error" 
            });
        }

    }

    function base64ToFormData(base64String, fileName) {
        const mimeType = base64String.substring(base64String.indexOf(':') + 1, base64String.indexOf(';'));
        
        const byteString = atob(base64String.split(',')[1]);
        const byteArray = new Uint8Array(byteString.length);
        
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([byteArray], { type: mimeType });
    
        const file = new File([blob], fileName, { type: mimeType });
    
        const formData = new FormData();
        formData.append('file', file);
    
        return formData;
    }

    return (
        <div ref={elementRef} className="w-full h-dvh flex items-center py-5 glass justify-between overflow-hidden max-2xl:mt-20">
            <div className={`flex flex-col justify-between gap-y-5 w-9/12 max-2xl:w-full mx-4 bg-white px-12 max-sm:px-5 py-8 overflow-y-scroll rounded-xl shadow-beautiful h-full duration-500 transition-all ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                <div className="flex flex-col w-full">
                    <h1 className="font-bold text-xl w-full text-center max-md:text-lg">{`Добавление записи в таблицу "${table.replace("id_", "Название ").replace(/_/g, " ").replace(table[0], (char) => char.toUpperCase())}"`}</h1>
                    
                    <div className="w-full flex flex-wrap gap-x-5 gap-y-5 mt-16">
                        {data?.columns && dictionary && data.columns.map((item, index) => {
                            const columnTitle = item.columnName
                                .replace("id_", "Название ")
                                .replace(/_/g, " ")
                                .replace(item.columnName[0], (char) => char.toUpperCase());

                            if (item.columnName.startsWith("id_")) {
                                return <DropdownInput key={index} title={columnTitle} table={table} dataType={item.dataType} onChange={handleInputChange(`"${item.columnType}"`)} value={dictionary[`"${item.columnType}"`]} />;
                            }

                            if (item.columnName.startsWith("Режим_доступа")) {
                                return <DropdownInputAccess key={index} title={columnTitle} onChange={handleInputChange(`"${item.columnType}"`)} value={dictionary[`"${item.columnType}"`]} />;
                            }

                            if (item.columnName.startsWith("Роль")) {
                                return null;
                            }

                            return <InsertInput key={index} title={columnTitle} type={item.dataType} value={dictionary[`"${item.columnType}"`]} onChange={handleInputChange(`"${item.columnType}"`)} />;
                        })}
                        { table && table === "пользователи" && <InsertInput key={123123123} title={"Пароль"} value={dictionary[`"password"`]} onChange={handleInputChange(`"password"`)} /> }
                    </div>
                </div>

                <button onClick={handleClick} className="px-10 min-h-12 w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white">
                    <h1 className='whitespace-nowrap font-bold'>Добавить запись</h1>
                    <AddNote className={"group-hover:fill-green-500 fill-white transition-all duration-300"}/>
                </button>
            </div>
            <div className="w-3/12 h-dvh max-2xl:hidden">
                <Notes className={"w-full"}/>
            </div>
        </div>
    )
}

export default InsertPage;
