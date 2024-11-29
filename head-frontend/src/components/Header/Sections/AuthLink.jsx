import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../consts/routes";
import { AdminPanel, User } from "../../../consts/Icons";
import { useAuth } from "../../../context/AuthContext";

const AuthLink = () => {
    const { isAuth } = useAuth();
    return isAuth ? (
        <Link to={"/admin" + ROUTES.DASHBOARD} className="max-xl:hidden flex text-lg text-white font-bold items-center justify-center group fixed right-12 top-12">
            <h1 className="text-white duration-300 transition-all group-hover:text-purple-400">Админ панель</h1>
            <AdminPanel/>
        </Link>
    ) : (
        <Link to={ROUTES.LOGIN} className="max-xl:hidden flex text-lg text-white font-bold items-center justify-center group fixed right-12 top-12">
            <h1 className="text-white duration-300 transition-all group-hover:text-purple-400">Войти</h1>
            <User/>
        </Link>
    );
}

export default AuthLink;
