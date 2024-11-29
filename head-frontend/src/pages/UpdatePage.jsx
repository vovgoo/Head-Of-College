import React, { useEffect, useState } from "react";
import Notes from "../components/Dashboard/Notes/Notes";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { fetchImage, fetchImageUpload, fetchUpdate, fetchUpdateIntoTable } from "../axios/axiosApi";
import { AddNote } from "../consts/Icons";
import InsertInput from "../components/InsertPage/InsertInput";
import DropdownInput from "../components/InsertPage/DropdownInput";
import DropdownInputAccess from "../components/InsertPage/DropdownInputAccess";
import { useNotification } from "../context/NotificatIonContext";

const UpdatePage = () => {

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const { table, row } = useParams();

    const [queryParams, setQueryParams] = useState(null);

    const { data } = useFetchData(fetchUpdate, queryParams);

    const handleQueryParamChange = (key, value) => setQueryParams((prev) => ({ ...prev, [key]: value }));

    useEffect(() => {
        if (table && row) {
          handleQueryParamChange("table", table);
          handleQueryParamChange("row", row);
        }
    }, [table, row]);      

    const [dictionary, setDictionary] = useState({});

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            if (!(blob instanceof Blob)) {
                return reject('Переданный объект не является Blob');
            }
            
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); 
            reader.onerror = reject;
            reader.readAsDataURL(blob); 
            console.log(blob); 
        });
    };
    
    // const getImageBase64 = async (image) => {
    //     try {
    //         const blob = await fetchImage(image);  
    //         if (blob) {
    //             const base64Result = await convertBlobToBase64(blob); 
    //             return base64Result;
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при обработке изображения:', error);
    //     }
    // };

    useEffect(() => {
        const getImageBase64 = async (image) => {
            try {
                const blob = await fetchImage(image);  
                if (blob) {
                    const base64Result = await convertBlobToBase64(blob); 
                    return base64Result;
                }
            } catch (error) {
                console.error('Ошибка при обработке изображения:', error);
            }
        };

        const processData = async () => {
            if (data?.columns) {
                const newDictionary = {};
    
                for (const item of data.columns) {
                    if (item.columnType === "image") {
                        if(item.value == null) {
                            newDictionary[`"${item.columnType}"`] = null;
                        } else {
                            try {
                                const base64Result = await getImageBase64(item.value);
                                newDictionary[`"${item.columnType}"`] = {
                                    name: `${item.value}`,
                                    photo: base64Result,
                                };
                            } catch (error) {
                                console.error('Error processing image:', error);
                            }
                        }
                    } else if ((`${item.columnType}` === "group" || `${item.columnType}` === "speciality") && table !== "темы_дипломных_работ") {
                        newDictionary[`"${item.columnType}"`] = { id: item.value.id, title: item.value.name };
                    } else if (`${item.columnType}` === "students") {
                        newDictionary[`"${item.columnType}"`] = {
                            id: item.value.id,
                            title: `${item.value.surname} ${item.value.name} ${item.value.fathername}`,
                        };
                    } else {
                        newDictionary[`"${item.columnType}"`] = `${item.value}`;
                    }
                }
    
                if (table === "пользователи") {
                    newDictionary[`"password"`] = "";
                    delete newDictionary[`"role"`];
                }
    
                setDictionary(newDictionary);
            }
        }
        
        processData();
    }, [data, table]);

    const handleInputChange = (columnType) => (newValue) => {
        setDictionary((prevDict) => ({
            ...prevDict,
            [columnType]: newValue  
        }));

        console.log(dictionary);
    };

    const { isVisible, elementRef } = useIntersectionObserver();

    const isBlank = str => !str || str.trim().length === 0;

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
                } else {
                    params[column.columnType] = null;
                }
            } else {
                params[column.columnType] = dictionary[`"${column.columnType}"`];
            }
        }

        if(table === "пользователи" && !isBlank(dictionary[`"password"`])) {
            params["password"] = dictionary[`"password"`];
        }
        
        try {
            await fetchUpdateIntoTable({ table, row, params });
            if(dictionary[`"image"`] != null) {
                await fetchImageUpload(base64ToFormData(dictionary[`"image"`].photo, dictionary[`"image"`].name));
            }
            
            showNotification({
                title: "Уведомление",
                message: "Запись успешно обновлена",
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

    return (
        <div ref={elementRef} className="w-full h-dvh flex items-center py-5 glass justify-between overflow-hidden max-2xl:mt-20">
            <div className={`flex flex-col justify-between gap-y-5 w-9/12 max-2xl:w-full mx-4 bg-white px-12 max-md:px-5 py-8 overflow-y-scroll rounded-xl shadow-beautiful h-full duration-500 transition-all ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                <div className="flex flex-col w-full">
                    <h1 className="font-bold text-xl w-full text-center">{`Редактирование записи в таблице "${table.replace("id_", "Название ").replace(/_/g, " ").replace(table[0], (char) => char.toUpperCase())}" c идентификатором ${row}`}</h1>
                    
                    <div className="w-full flex flex-wrap gap-x-5 gap-y-5 mt-16 max-md:mt-5">
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
                        { table && table === "пользователи" && <InsertInput title={"Пароль"} value={dictionary[`"password"`]} onChange={handleInputChange(`"password"`)} /> }
                    </div>
                </div>

                <button onClick={handleClick} className="px-10 min-h-12 w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white">
                    <h1 className='whitespace-nowrap font-bold'>Сохранить изменения</h1>
                    <AddNote className={"group-hover:fill-green-500 fill-white transition-all duration-300"}/>
                </button>
            </div>
            <div className="w-3/12 h-dvh max-2xl:hidden">
                <Notes className={"w-full"}/>
            </div>
        </div>
    )
}

export default UpdatePage;
