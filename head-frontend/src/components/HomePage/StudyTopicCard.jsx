import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { CardOne, CardThree, CarsTwo } from "../../consts/Icons";

const StudyTopicCard = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div className="flex w-full flex-col" ref={elementRef}>
            <h1 className={`text-5xl opacity-0 duration-300 transition-all font-bold text-white w-full max-2xl:mt-16 max-md:text-4xl max-sm:text-3xl mt-72 text-center tracking-widest glow ${isVisible ? "fade-in" : ""}`}>
                Что мы изучаем?
            </h1>
            <h1 className={`text-xl opacity-0 duration-500 transition-all font-bold text-gray-500 w-full text-center mt-5 tracking-widest max-md:text-base max-sm:text-sm ${isVisible ? "fade-in" : ""}`}>
                Самые популярные направления
            </h1>

            <div className="w-full px-28 max-lg:px-5 mb-10 flex flex-wrap max-2xl:flex-col max-2xl:items-center max-2xl:gap-y-32 mt-52 max-2xl:mt-32 justify-center gap-x-0">
                <div className="px-5 w-1/3 max-2xl:w-full relative fade-in delay-1">
                    <div className="bg-yellow-400 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 z-10 flex items-center justify-center">
                        <CardOne/>
                    </div>
                    <div className="glass-cards h-80 relative overflow-hidden flex items-center justify-center flex-col px-10 text-center">
                        <div className="bg-yellow-400 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 shadow-yellow"/>
                        <h1 className="font-bold text-3xl text-white w-full text-center mb-5 mt-10 break-words max-sm:text-2xl">Веб-разработка</h1>
                        <h1 className="font-bold tracking-widest text-gray-300">Создание и поддержка веб-приложений, работа с HTML, CSS и JavaScript.</h1>
                    </div>
                </div>

                <div className="px-5 w-1/3 max-2xl:w-full relative fade-in delay-2">
                    <div className="bg-purple-500 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 z-10 flex items-center justify-center">
                        <CarsTwo/>
                    </div>
                    <div className="glass-cards h-80 relative overflow-hidden flex items-center justify-center flex-col px-10 text-center">
                        <div className="bg-purple-500 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 shadow-purple"/>
                        <h1 className="font-bold text-3xl text-white w-full text-center mb-5 mt-10 break-words max-sm:text-2xl">Программирование</h1>
                        <h1 className="font-bold tracking-widest text-gray-300">Изучение языков программирования, алгоритмы и структуры данных.</h1>
                    </div>
                </div>

                <div className="px-5 w-1/3 max-2xl:w-full relative fade-in delay-3">
                    <div className="bg-red-500 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 z-10 flex items-center justify-center">
                        <CardThree/>
                    </div>
                    <div className="glass-cards h-80 relative overflow-hidden flex items-center justify-center flex-col px-10 text-center">
                        <div className="bg-red-500 h-32 w-32 absolute rounded-full left-1/2 -translate-x-1/2 -top-14 shadow-red"/>
                        <h1 className="font-bold text-3xl text-white w-full text-center mb-5 mt-10 break-words max-sm:text-2xl">Базы данных</h1>
                        <h1 className="font-bold tracking-widest text-gray-300">Основы проектирования и управления базами данных.</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudyTopicCard;
