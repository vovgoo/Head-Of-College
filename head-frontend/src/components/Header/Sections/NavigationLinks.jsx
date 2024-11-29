import React from "react";
import ROUTES from "../../../consts/routes";
import { Link } from "react-router-dom";

const NavigationLinks = () => {
    return (
        <ul className="max-xl:hidden flex text-lg text-white font-bold gap-x-10 items-center fixed top-12 left-1/2 -translate-x-1/2">
            <Link to={ROUTES.HOME} className="text-white duration-300 transition-all hover:text-purple-400">Главная</Link>
            <Link to={ROUTES.TOPICS} className="text-white duration-300 transition-all hover:text-purple-400">Темы дипломных работ</Link>
        </ul>
    );
}

export default NavigationLinks;
