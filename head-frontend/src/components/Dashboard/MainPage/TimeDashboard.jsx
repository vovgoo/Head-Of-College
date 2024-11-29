import React, { useEffect, useState } from "react";
import IMAGES from "../../../consts/Images";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const TimeDashboard = () => {

    const { isVisible, elementRef } = useIntersectionObserver();
    
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const weekdays = [
        'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'
    ];

    const day = time.getDate();
    const month = months[time.getMonth()]; 
    const year = time.getFullYear();
    const weekday = weekdays[time.getDay()]; 

    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `${day} ${month} ${year}, ${weekday}`; 

    return (
        <div ref={elementRef} className="h-72 w-6/12 max-lg:w-full">
            <div className={`h-full w-full rounded-xl bg-blue-400 relative overflow-hidden shadow-blue-200 shadow-lg text-white font-bold transition-all duration-500 ${isVisible ? "" : "-translate-x-full opacity-0"}`}>
                <h1 className={`absolute text-2xl font-bold left-5 top-5 transition-all duration-1000 ${isVisible ? "" : "-translate-y-full opacity-0"}`}>{dateString}</h1>
                <h1 className={`absolute text-6xl font-bold left-5 top-24 z-20 time transition-all duration-1000 ${isVisible ? "" : "-translate-y-full opacity-0"}`}>{timeString}</h1>
                <img src={IMAGES.TIME} alt="" className={`h-52 max-sm:h-40 absolute -bottom-7 -right-7 z-20 rotate-12 transition-all duration-1000 ${isVisible ? "" : "translate-x-full opacity-0"}`} />
                <img src={IMAGES.TRANSITION} alt="" className={`grayscale h-full opacity-50 absolute -bottom-5 -left-10 transition-all duration-1000 ${isVisible ? "" : "-translate-x-full opacity-0"}`} />
            </div>
        </div>
    )
}

export default TimeDashboard;
