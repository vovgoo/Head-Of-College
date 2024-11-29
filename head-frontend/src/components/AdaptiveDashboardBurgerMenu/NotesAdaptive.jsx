import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddNote, CloseBurgerMenu } from "../../consts/Icons";
import Note from "../Dashboard/Notes/Note";
import useFetchData from "../../hooks/useFetchData";
import { fetchNotes } from "../../axios/axiosApi";
import { useNote } from "../../context/NotesCreateContext";
import { debounce } from "lodash";

const NotesAdaptive = ({notesOpen, openNotes, userData}) => {

    const { openModal } = useNote();

    const [notes, setNotes] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [queryParams, setQueryParams] = useState({
        search: "",
        page: 0,
    });
    const notesRef = useRef(null);

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => ({
            ...prev,
            [key]: value,
            page: key === "page" ? value : 0,
        }));
    }, []);

    const { data } = useFetchData(fetchNotes, queryParams);

    useEffect(() => {
        setNotes([]);
        setHasMore(true);
    }, [queryParams.search]);

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (notesRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = notesRef.current;

                if (scrollHeight - scrollTop - clientHeight <= 200 && hasMore) {
                    handleQueryParamChange("page", queryParams.page + 1);
                }
            }
        }, 300);

        const container = notesRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [hasMore, queryParams.page, handleQueryParamChange]);

    useEffect(() => {
        if (data?.notes?.content) {
            setNotes((prevNotes) => [...prevNotes, ...data.notes.content]);
            setHasMore(data.notes.content.length > 0);
        }
    }, [data]);

    const handleRefresh = () => {
        setNotes([]);
        handleQueryParamChange("page", 0);
        handleQueryParamChange("search", "");
    }

    const handleAddNote = () => {
        openNotes();
        openModal({ updateNotes: handleRefresh, type: "insert" });
    };

    return (
        <div className={`w-full overflow-hidden z-50 h-dvh overflow-y-scroll fixed top-0 left-0 bg-white duration-300 transition-300 ${notesOpen ? "" : "translate-x-full"}`}>
            <div className="absolute right-8 top-custom">
                <CloseBurgerMenu onClick={openNotes} />
            </div>
            <div className={`bg-white rounded-xl h-full shadow-beautiful duration-500 transition-all`}>
                <div className="w-full h-full flex flex-col">
                    <div className={`text-xl font-bold flex items-center justify-between mx-8 mt-8 duration-500 transition-all pr-10`}>
                        <h1 className={`${userData?.users?.role === 'ADMIN' ? "" : "text-center"}`}>{userData?.users?.role === 'ADMIN' ? "Ваши заметки" : "Заметки заведующей отделения"}</h1>
                        {userData?.users?.role === 'ADMIN' && <AddNote onClick={handleAddNote} />}
                    </div>
                    <div className={`w-full px-8 duration-500 transition-all`}>
                        <input value={queryParams.search} onChange={(e) => handleQueryParamChange("search", e.target.value)} placeholder="Поиск" type="text" id="large-input" className="font-semibold my-5 h-14 block w-full p-4 text-black border-2 border-gray-300 rounded-lg bg-gray-50 text-base outline-none hover:border-green-500 focus:border-green-500 transition-all duration-300"></input>
                    </div>
                    <div ref={notesRef} className="w-full h-full flex-col flex gap-y-5 overflow-y-scroll overflow-x-hidden px-8 pb-5 rounded-xl">
                        {notes.map((note) => (
                            <Note
                                openNotes={openNotes}
                                role={userData?.users?.role}
                                index={note.id}
                                title={note.title}
                                description={note.text}
                                access={note.noteAccess === "ALL" ? "Для всех" : "Только для меня"}
                                time={new Date(note.createTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                date={new Date(note.createTime).toLocaleDateString('ru-RU')}
                                handleRemoveNote={handleRefresh}
                                
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesAdaptive;
