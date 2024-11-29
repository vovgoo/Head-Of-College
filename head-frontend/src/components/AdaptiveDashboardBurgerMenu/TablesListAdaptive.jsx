import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from "../../context/AuthContext";
import { CloseBurgerMenu } from "../../consts/Icons";
import UserProfile from "../BurgerMenu/BurgerMenuComponents/UserProfile";
import BurgerMenuTables from "../BurgerMenu/BurgerMenuTables";
import { fetchBurgerMenu } from "../../axios/axiosApi";

const TablesListAdaptive = ({setBurgerMenu, burgerMenu, openBurgerMenu}) => {

    const location = useLocation();

    useEffect(() => {
        setBurgerMenu(false);
    }, [location, setBurgerMenu]);

    const { data } = useFetchData(fetchBurgerMenu);

    const { logout } = useAuth();

    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleLogout = () => {
        setBurgerMenu(false);
        logout();
        setRedirectToHome(true);
    };

    if (redirectToHome) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={`w-full overflow-hidden z-50 h-dvh overflow-y-scroll fixed top-0 left-0 bg-white duration-300 transition-300 ${burgerMenu ? "" : "-translate-x-full"}`}>
            <div className="absolute right-8 top-custom">
                <CloseBurgerMenu onClick={openBurgerMenu} />
            </div>
            <div className={`overflow-hidden flex flex-col h-full bg-white justify-between pb-3 pt-5 shadow-beautiful duration-500 transition-all`}>
                <div className="h-full flex flex-col">
                    <div className="flex flex-col">
                        {data && <UserProfile dataTables={data} />}

                        <div className={`w-full font-bold text-center text-gray-800 mb-5 duration-500 transition-all`}>
                            <h1>Панель управления</h1>
                        </div>
                    </div>

                    {data?.tables && <BurgerMenuTables data={data.tables} users = {data.users} />}

                    <div className={`transition-all duration-700`}>
                        <div className="w-full px-5">
                            <button onClick={handleLogout} className="w-full flex items-center justify-center bg-black rounded text-white py-2 mb-0 mt-2 duration-300 transition-all hover:bg-green-500 font-bold">Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablesListAdaptive;
