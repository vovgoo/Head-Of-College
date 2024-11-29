import React from 'react'

import IMAGES from '../../consts/Images';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const TopicSelectionHeader = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className='w-full flex flex-col font-bold text-white items-center gap-y-5'>
            <div className='flex gap-x-5 items-center justify-center pt-10 max-md:px-5'>
                <h1 className={`text-4xl glow duration-500 transition-all max-xl:text-2xl max-md:text-xl max-md:text-center ${isVisible ? "opacity-100" : "opacity-0"}`}>Привет, пришел выбирать тему дипломной работы?</h1>
                <img src={IMAGES.CLAPPER} className={`h-20 transition-all duration-500 max-xl:h-10 max-md:hidden ${isVisible ? "scale-100 glow-topics" : "scale-0"}`} alt="" />
            </div>
            <h1 className={`tracking-widest text-lg max-xl:text-sm text-gray-300 duration-1000 max-md:px-5 max-md:text-center transition-all ${isVisible ? "opacity-100" : "opacity-0"}`}>Смотри внимательнее, что бы твоя тема не повторялась ближайшие 5 лет.</h1>
        </div>
    );
}

export default TopicSelectionHeader;
