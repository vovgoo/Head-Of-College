import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdminPanel, OpenBurgerMenu, User } from "../../../consts/Icons";
import { useAuth } from "../../../context/AuthContext";
import ROUTES from "../../../consts/routes";

const BurgerMenu = () => {

    const { isAuth } = useAuth();

    const [open, setOpen] = useState(false);

    const openBurgerMenu = () => {
        setOpen(!open);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div onClick={openBurgerMenu} className="z-max xl:hidden absolute right-10 top-10">
                <OpenBurgerMenu open={open} />
            </div>
            <div className={`z-40 fixed bg-white w-full h-dvh duration-300 transition-all ${open ? "overflow-hidden" : "translate-x-full"}`}>
                <h1 className="top-12 left-10 absolute font-bold text-2xl">Навигация</h1>
                <div className="w-full flex flex-col items-center mt-52">
                    <Link onClick={openBurgerMenu} to={ROUTES.HOME} className="text-black font-bold text-xl duration-300 transition-all hover:text-purple-400 py-5">Главная</Link>
                    <Link onClick={openBurgerMenu} to={ROUTES.TOPICS} className="text-black font-bold text-xl duration-300 transition-all hover:text-purple-400 py-5">Темы дипломных работ</Link>
                    {isAuth ? (
                        <Link onClick={openBurgerMenu} to={"/admin" + ROUTES.DASHBOARD} className="flex text-black text-xl font-bold items-center justify-center group py-5">
                            <h1 className="text-black duration-300 transition-all group-hover:text-purple-400">Админ панель</h1>
                            <AdminPanel className={"fill-black"} />
                        </Link>
                    ) : (
                        <Link onClick={openBurgerMenu} to={ROUTES.LOGIN} className="flex text-black text-xl font-bold items-center justify-center group py-5">
                            <h1 className="text-black duration-300 transition-all group-hover:text-purple-400">Войти</h1>
                            <User className={"fill-black"}/>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    );
}

export default BurgerMenu;
