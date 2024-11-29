import React, { useEffect, useState } from "react";
import TablesListAdaptive from "./TablesListAdaptive";
import NotesAdaptive from "./NotesAdaptive";
import useFetchData from "../../hooks/useFetchData";
import { fetchDashboard } from "../../axios/axiosApi";

const BurgerMenuAdaptive = () => {

    const { data } = useFetchData(fetchDashboard);

    const [burgerMenu, setBurgerMenu] = useState(false);
    const [notes, setNotes] = useState(false);

    const openBurgerMenu = () => {
        setBurgerMenu(!burgerMenu);
    }

    const openNotes = () => {
        setNotes(!notes);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        document.body.style.overflow = (burgerMenu || notes) ? 'hidden' : 'auto';
    }, [burgerMenu, notes]);

    return (
        <div className="z-50 2xl:hidden w-full h-20 glass max-2xl:absolute flex justify-between max-2xl:px-16 max-sm:px-5">
            <TablesListAdaptive
                openBurgerMenu={openBurgerMenu}
                setBurgerMenu={setBurgerMenu}
                burgerMenu={burgerMenu}
            />

            <NotesAdaptive
                notesOpen={notes}
                openNotes={openNotes}
                userData={data}
            />
            <button onClick={openBurgerMenu} className="font-bold text-base text-gray-700 px-5 bg-white shadow-beautiful my-5 rounded-xl duration-300 transition-all hover:text-purple-400 select-none">Меню</button>
            <button onClick={openNotes} className="font-bold text-base text-gray-700 px-5 bg-white shadow-beautiful my-5 rounded-xl duration-300 transition-all hover:text-purple-400 select-none">Заметки</button>
        </div>
    );
}

export default BurgerMenuAdaptive;
