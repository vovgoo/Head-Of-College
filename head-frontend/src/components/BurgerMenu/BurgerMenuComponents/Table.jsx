import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Table = ({ name, index, link }) => {
    const location = useLocation();

    const isActive = decodeURIComponent(location.pathname) === link;

    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const currentRef = elementRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={elementRef} className="">
            <Link to={link} className={`w-full flex items-center py-2 group transition-all duration-300 cursor-pointer h-14 ${isVisible ? "" : "-translate-x-full"}`}>
                <div className="min-w-6 max-w-6 flex h-full">
                    <div className={`h-full min-w-2 max-w-2 ${isActive ? "bg-green-500": "bg-burger-menu"} rounded-br-full rounded-tr-full`}>

                    </div>
                </div>
                <div className="mr-5 h-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" className={`stroke-gray-600 transition-all duration-300 group-hover:stroke-green-500 ${isActive ? "stroke-green-500": ""} `}>
                        <path d="M4 9L20 9M8 9V20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <script xmlns="" /></svg>
                </div>
                <div className="h-full flex items-center">
                    <h1 className={`transition-all duration-300 group-hover:text-green-500 select-none ${isActive? "text-green-500": ""}`}>{name}</h1>
                </div>
            </Link>
        </div>
    )
}

export default Table;
