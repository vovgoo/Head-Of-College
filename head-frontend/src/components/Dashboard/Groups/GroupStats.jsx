import React from "react";
import IMAGES from "../../../consts/Images";


const GroupStats = ({ isVisible, name, add1, add2, add3, add4, add5, add6, add7, add8, add9, add10, add11, add12, add13, add14, add15 }) => {
    
    return (
        <div className={`bg-white w-45 max-lg:w-full max-lg:mx-1 shadow-cards rounded items-center justify-between flex rounded-tr-xl rounded-tl-xl flex-col duration-500 transition-all ${isVisible ? "" : "translate-x-full opacity-0"}`}>
            <div className="rounded-tr-xl rounded-tl-xl w-full h-32 relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-full">
                    <img src={IMAGES.GROUPS_GIF} alt="" className="w-full object-center" />
                </div>
                <div className="w-full h-full bg-black absolute opacity-20" />
                <h1 className="text-5xl w-full font-bold text-center my-10 text-white z-10 text">{name}</h1>
            </div>

            <div className="w-full flex flex-col text-sm p-5 gap-y-3 font-semibold text-gray-800">
                <div className="w-full justify-between flex">
                    <h1>Специальность</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add1}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Общее количество студентов</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add2}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Средний балл по всем студентам</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add3}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Количество студентов с надбавками</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add4}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Количество студентов с взысканиями</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add5}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 0.0 до 0.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add6}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 1.0 до 1.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add7}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 2.0 до 2.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add8}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 3.0 до 3.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add9}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 4.0 до 4.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add10}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 5.0 до 5.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add11}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 6.0 до 6.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add12}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 7.0 до 7.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add13}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 8.0 до 8.9</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add14}</h1>
                </div>
                <div className="w-full justify-between flex">
                    <h1>Студенты с баллом от 9.0 до 10.0</h1>
                    <div className="relative flex-grow before:content-[''] before:w-full before:border-b-2 before:border-dotted before:border-gray-500 before:absolute before:bottom-1 mx-1 before:-translate-y-1/2"></div>
                    <h1>{add15}</h1>
                </div>
            </div>
        </div>
    )
}

export default GroupStats;
