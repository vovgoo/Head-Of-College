import React from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { RemoveNote, UpdateNote } from "../../../consts/Icons";
import { useNotification } from "../../../context/NotificatIonContext";
import { fetchDeteleIntoTable } from "../../../axios/axiosApi";
import { useNote } from "../../../context/NotesCreateContext";


const Note = ({ role, index, title, access, description, time, date, handleRemoveNote, openNotes }) => {

    const { isVisible, elementRef } = useIntersectionObserver();
    
    const { showNotification } = useNotification();

    const { openModal } = useNote();

    const handleDeleteNote = async () => {

        const table = "заметки";
        const row = index;

        try {
            await fetchDeteleIntoTable({ table, row });

            handleRemoveNote(index);
    
            showNotification({
                title: "Уведомление",
                message: "Запись успешно удалена",
                type: "success"
            });

        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Выберите корректную запись",
                type: "error" 
            });
        }
    };

    const handleUpdateNote = () => {
        if(openNotes != null) openNotes();
        openModal({ updateNotes: handleRemoveNote, type: "update", index: index, title: title, description: description, access: access });
    };

    return (
        <div ref={elementRef} className="w-full">
            <div className={`w-full bg-yellow-300 shadow-note relative transition-all duration-1000 ${isVisible ? " " : "translate-x-full opacity-0"}`}>
                <div className="w-full flex justify-between items-center px-4 pt-4 z-50">
                    <div className={`flex items-center justify-center gap-x-3`}>
                        <div className="items-center justify-center flex border-2 rounded border-gray-600 px-2 gap-x-2 cursor-default">
                            <div className="w-2 h-2 bg-gray-600 rounded-full" />
                            <h1 className="text-sm font-bold text-gray-600 cursor-default">{access}</h1>
                        </div>
                    </div>
                    <div className={`flex gap-x-3 ${ role === "ADMIN" ? "" : "hidden"}`}>
                        <UpdateNote onClick={handleUpdateNote}/>
                        <RemoveNote onClick = {handleDeleteNote}/>
                    </div>
                </div>
                <h1 className="font-bold text-xl px-4 my-4 z-10">{title}</h1>
                <div className="note z-10" />
                <h1 className="w-full text-justify px-4 my-4 z-10">{description}</h1>
                <div className="note z-10" />
                <div className="flex gap-x-5 justify-between px-4 my-2 z-10">
                    <h1 className="font-bold text-sm text-right z-10">{time}</h1>
                    <h1 className="font-bold text-sm text-right z-10">{date}</h1>
                </div>
            </div>
        </div>
    )
}

export default Note;
