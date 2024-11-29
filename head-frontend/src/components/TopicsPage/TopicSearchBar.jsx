import React from 'react'

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { Search } from '../../consts/Icons';

const TopicSearchBar = ({value, handleQueryParamChange}) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className={`w-full flex justify-center my-20 max-md:my-16 duration-1000 transition-all ${isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}`}>
            <div className='w-2/4 max-lg:w-3/4 max-sm:w-full max-sm:mx-5 flex bg-gray-900 border-4 border-gray-600 rounded-xl items-center justify-center transition-all duration-300 focus-within:animate-border-transition'>
                <Search />
                <input
                    value={value}
                    onChange={(e) => handleQueryParamChange("description", e.target.value)}
                    type="text"
                    placeholder='Самая клевая тема диплома..'
                    className='w-full my-5 mr-5 text-2xl max-xl:text-xl max-md:text-base font-bold tracking-widest text-gray-300 outline-none bg-transparent' />
            </div>
        </div>
    );
}

export default TopicSearchBar;
