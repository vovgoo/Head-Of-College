import React from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import IMAGES from "../../../consts/Images";


const CalendarDashboard = () => {

    const { isVisible, elementRef } = useIntersectionObserver();
    
    addLocale('ru', {
        firstDayOfWeek: 1,
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        dayNamesMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
        monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
        monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        today: 'Сегодня',
        clear: 'Очистить'
    });   

    return (
        <div ref={elementRef} className="h-72 w-6/12 max-lg:w-full">
            <div className={`h-full w-full rounded-xl bg-purple-400 relative overflow-hidden shadow-purple-200 shadow-lg transition-all duration-500 ${isVisible ? "" : "translate-x-full opacity-0"}`}>
                <Calendar inline readOnlyInput value={""} locale="ru" className={`absolute left-0 transition-all duration-1000 ${isVisible ? "" : "-translate-y-full opacity-0"}`} />
                <img src={IMAGES.DATE} alt="" className={`h-52 max-sm:h-40 absolute -bottom-7 -right-7 z-20 rotate-12 transition-all duration-1000 ${isVisible ? "" : "translate-x-full opacity-0"}`} />
                <img src={IMAGES.TRANSITION} alt="" className={`grayscale h-full opacity-50 absolute -bottom-5 -left-10 transition-all duration-1000 ${isVisible ? "" : "-translate-x-full opacity-0"}`} />
            </div>
        </div>
    )
}

export default CalendarDashboard;
