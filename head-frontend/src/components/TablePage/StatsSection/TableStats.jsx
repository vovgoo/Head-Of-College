import React from "react";

const TableStats = ({text, number, img}) => {

    return (
        <div className="w-1/3 max-2xl:w-full bg-white shadow-cards h-40 rounded-xl items-center justify-between flex px-2 flex-col relative overflow-hidden">
            <div className="bg-black rounded-md flex items-center justify-center absolute left-5 top-5">
                <h1 className="text-white font-bold text-2xl p-5">{number}</h1>
            </div>
            <div className="font-semibold absolute left-5 bottom-5 z-10 w-7/12">
                <h1 className="max-sm:text-sm">{text}</h1>
            </div>

            <img src={img} alt="" className="w-44 max-sm:w-32 object-center absolute z-0 -right-5 -bottom-2" />
        </div>
    )
}

export default TableStats;
