import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import IMAGES from "../../consts/Images";

const StudyTopicsSection = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className="flex w-full flex-col">
            <div className="w-full py-32 max-2xl:py-0 px-32 max-lg:px-20 max-sm:px-3 max-sm:font-base flex max-2xl:flex-col">
                <div className={`max-2xl:w-full -translate-x-full w-1/2 flex items-center justify-center ${isVisible ? "animate-slide-in-left" : "-translate-x-full"}`}>
                    <img src={IMAGES.MAIN_IMAGE_TWO} className="max-sm:my-16 glow-main w-1/2 scale-animation" alt="" />
                </div>
                <div className={`max-2xl:w-full translate-x-full  w-1/2 flex gap-y-10 justify-center flex-col ${isVisible ? "animate-slide-in-right" : "translate-x-full"}`}>
                    <h1 className="text-5xl font-bold text-white max-2xl:text-center max-lg:text-3xl max-sm:text-2xl">О нашем отделении</h1>
                    <h1 className="text-xl tracking-widest text-white mb-10 text-justify max-md:text-lg max-sm:text-base">
                        Отделение информационных систем и технологий предоставляет
                        качественное образование, охватывающее широкий спектр тем,
                        включая программирование, веб-разработку, базы данных и сетевые
                        технологии. Мы готовим специалистов, которые могут успешно работать
                        в быстро меняющемся мире IT. Каждый курс включает теоретические и
                        практические занятия, что позволяет вам применять знания на практике.
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default StudyTopicsSection;
