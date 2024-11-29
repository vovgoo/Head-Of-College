import React from "react";
import { Link } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import IMAGES from "../../consts/Images";
import ROUTES from "../../consts/routes";

const WelcomeSection = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className="w-full flex max-2xl:flex-col-reverse max-2xl:justify-center">
            <div className={`w-1/2 max-2xl:w-full max-2xl:items-center -translate-x-full gap-y-10 px-32 max-lg:px-20 max-sm:px-10 justify-center flex flex-col ${isVisible ? "animate-slide-in-left" : ""}`}>
                <div className="flex items-center mt-20 max-2xl:justify-center">
                    <h1 className="text-5xl font-bold text-white max-md:text-4xl max-sm:text-2xl">Добро пожаловать</h1>
                    <img src={IMAGES.HELLO_HAND} className="inline h-12 ml-5 rotate-animation glow-yellow max-md:h-10 max-sm:h-8" alt="" />
                </div>
                <h1 className="text-xl max-md:text-lg max-sm:text-base text-justify tracking-widest text-white mb-10 max-2xl:justify-center">
                    Вы находитесь на странице нашего отделения, где мы рады делиться с вами важной информацией, новостями и событиями. Наша цель — поддержать вас в учебном процессе и помочь вам развить навыки, необходимые для успешной карьеры в области информационных технологий.
                </h1>

                <Link to={ROUTES.TOPICS} className="max-2xl:justify-center max-md:w-full w-1/2 py-3 flex items-center justify-center bg-black rounded text-white mb-5 duration-300 transition-all hover:bg-green-500 font-bold text-nowrap">Темы дипломных работ</Link>
            </div>
            <div className={`translate-x-full w-1/2 max-2xl:w-full flex items-center justify-center ${isVisible ? "animate-slide-in-right" : ""}`}>
                <img src={IMAGES.MAIN_IMAGE} className="glow-main w-7/12 scale-animation max-2xl:w-3/12 max-lg:w-5/12 max-md:w-7/12" alt="" />
            </div>
        </div>
    )
}

export default WelcomeSection;
