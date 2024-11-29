import React from "react";
import Header from "../components/Header/Header";
import IMAGES from "../consts/Images";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const NotFoundPage = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div className="w-full h-dvh bg-black z-50 relative" ref={elementRef}>
            <Header className={"fixed"}/>
            <img src={IMAGES.NOT_FOUND_GIF} className={`object-fill absolute h-dvh w-full blur duration-1000 transition-all ${isVisible ? "" : "opacity-0"}`} alt="" />
            <div className={`w-full h-dvh absolute bg-black transition-all duration-1000 ${isVisible ? "opacity-60": "opacity-0"}`}/>
            <div className="w-full h-dvh absolute flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className={`font-bold text-white text-mnogo -mt-32 max-md:text-malo text-not transition-all duration-500 ${isVisible ? "": "opacity-0 translate-y-full"}`}>404</h1>
                    <h1 className={`font-bold text-white text-5xl max-md:text-2xl max-md:-mt-10 -mt-20 transition-all duration-500 ${isVisible ? "": "opacity-0 translate-y-full"}`}>Страница не найдена</h1>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;
