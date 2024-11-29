import React, { useEffect, useState } from "react";
import UserProfile from "./BurgerMenuComponents/UserProfile";
import { Navigate } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { fetchBurgerMenu } from "../../axios/axiosApi";
import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import BurgerMenuTables from "./BurgerMenuTables";

const BurgerMenu = () => {
    
    const { error, data } = useFetchData(fetchBurgerMenu);

    const { isVisible, elementRef } = useIntersectionObserver();
    
    const { logout } = useAuth();

    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleLogout = () => {
        logout();
        setRedirectToHome(true); 
    };

    useEffect(() => {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            logout();
            setRedirectToHome(true);
        }
    }, [error, logout])

    if (redirectToHome) {
        return <Navigate to="/" replace />;
    }

    return (
        <div ref={elementRef} className={`w-2/12 p-5 glass h-dvh overflow-hidden max-2xl:hidden`}>
            <div className={`overflow-hidden flex flex-col h-full rounded-xl bg-white justify-between pb-3 pt-5 shadow-beautiful duration-500 transition-all ${isVisible ? "opacity-100" : "-translate-x-full opacity-0"}`}>
                <div className="h-full flex flex-col">
                    <div className="flex flex-col">
                        {data && <UserProfile dataTables={data} />}

                        <div className={`w-full font-bold text-center text-gray-800 mb-5 duration-500 transition-all ${isVisible ? "opacity-100" : "-translate-y-20 opacity-0"}`}>
                            <h1>Панель управления</h1>
                        </div>
                    </div>

                    {data?.tables && <BurgerMenuTables data = {data.tables} users = {data.users}/>}

                    <div className={`transition-all duration-700 ${isVisible ? "" : "opacity-0 translate-y-full"}`}>
                        <div className="w-full px-5">
                            <button onClick={handleLogout} className="w-full flex items-center justify-center bg-black rounded text-white py-2 mb-0 mt-2 duration-300 transition-all hover:bg-green-500 font-bold">Выйти</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default BurgerMenu;
