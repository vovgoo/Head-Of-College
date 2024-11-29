import React from "react";
import TableComponent from "./TableComponent"
import useVisibleRows from "../../../../hooks/useVisibleRows"
import IMAGES from "../../../../consts/Images";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";

const TopicTable = ({ rows }) => {

    const visibleRows = useVisibleRows(rows);
    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className={`relative w-full h-full shadow-beautiful rounded-lg overflow-hidden duration-1000 transition-all ${isVisible ? "opacity-100 translate-y-0" : "translate-y-10 opacity-0"}`}>
            <img className="z-0 w-full object-cover opacity-80 blur-xl absolute inset-0" src={IMAGES.TABLE_SEARCH_BACKGROUND} alt="Background" />
            <div className="z-10 bg-gradient-to-br from-gray-800 to-gray-950 w-full h-full absolute opacity-90 inset-0" />
            <div className="overflow-x-scroll overflow-y-hidden w-full h-full">
                <table className="max-md:min-w-full relative z-20 w-full rounded-lg">
                    <thead>
                        <tr className='border-purple-950 border-b-2'>
                            <td className="text-nowrap max-md:px-10 border-r-2 border-purple-950 w-3/4 text-center text-white font-bold tracking-widest text-xl py-5">
                                Тема дипломного проекта
                            </td>
                            <td className="text-nowrap max-md:px-10 w-1/4 text-center text-white font-bold tracking-widest text-xl py-5">
                                Год утверждения
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            visibleRows.includes(index) && (
                                <TableComponent key={index} description={row.description} year={row.year} index={index} />
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopicTable;
