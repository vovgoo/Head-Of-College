import React from "react";
import IMAGES from "../../../consts/Images";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import TableStats from "./TableStats";

const StatsSection = ({data, table}) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div className="w-full" ref={elementRef}>
            <div className={`flex items-center gap-x-5 my-10`}>
                <h1 className={`text-xl font-bold transition-all duration-500 max-sm:text-center max-sm:w-full ${isVisible ? "" : "-translate-y-full opacity-0"}`}>Статистика по таблице {table.replace(/_/g, " ").replace(table[0], (char) => char.toUpperCase())}!</h1>
                <img src={IMAGES.STATS_EMOJI} alt="" className={`max-sm:hidden h-10 transition-all duration-500 ${isVisible ? "" : "-translate-y-full opacity-0"}`} />
            </div>

            <div className={`w-full flex gap-x-10 transition-all duration-700 max-sm:flex-col max-sm:gap-y-10 ${isVisible ? "" : "-translate-y-10 opacity-0"}`}>
                <TableStats
                    img={IMAGES.ALL_STATS_1}
                    text={"Количество строк в таблице"}
                    number={data?.countRows}
                />

                <TableStats
                    img={IMAGES.ALL_STATS_2}
                    text={"Размер таблицы"}
                    number={data?.tableSize + ' Kbs'}
                />
            </div>
        </div>
    )
}

export default StatsSection;
