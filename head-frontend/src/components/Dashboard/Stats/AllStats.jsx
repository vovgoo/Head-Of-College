import React from "react";

const AllStats = ({isVisible, name, img, count}) => {

    return (
        <div className={`w-45 max-lg:w-full bg-white shadow-cards h-52 rounded-xl items-center justify-between flex px-2 flex-col relative overflow-hidden duration-500 transition-all ${isVisible ? " " : "translate-y-full opacity-0"}`}>
            <div className="bg-black rounded-md flex items-center justify-center absolute left-5 top-5">
                <h1 className="text-white font-bold text-2xl p-5">{count}</h1>
            </div>
            <div className="font-semibold absolute left-5 bottom-5 z-10 w-7/12 max-sm:text-sm">
                <h1>{name}</h1>
            </div>

            <img src={img} alt="" className="w-60 max-sm:w-40 object-center absolute z-0 -right-12 -bottom-5" />
        </div>
    )
}

export default AllStats;
