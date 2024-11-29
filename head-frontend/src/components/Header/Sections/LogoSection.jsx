import React from "react";
import IMAGES from "../../../consts/Images";
import { Link } from "react-router-dom";

const LogoSection = () => {
    return (
        <Link to={"/"} className="pl-5 pt-5 flex items-center justify-center max-xl:pr-5 max-xl:w-full max-sm:justify-start">
            <img src={IMAGES.LOGO} className="h-20 max-sm:py-3" alt="" />
            <h1 className="ml-5 text-lg text-white font-bold tracking-widest max-sm:text-base max-sm:mr-32">Кабинет заведующего</h1>
        </Link>
    );
}

export default LogoSection;
