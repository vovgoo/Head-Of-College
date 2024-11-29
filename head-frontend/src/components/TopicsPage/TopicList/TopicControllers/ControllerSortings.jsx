import React from "react";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import Dropdown from "./Dropdown";

const ControllerSortings = ({ data, queryParams, handleQueryParamChange, sortType }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className={`max-xl:w-full max-lg:flex-col flex justify-between items-center gap-x-5 duration-1000 transition-all ${isVisible ? "opacity-100" : "translate-x-full opacity-0"}`}>
            <div className="flex items-center gap-x-5 max-lg:w-full max-lg:justify-between max-lg:mb-10 max-sm:flex-col max-sm:gap-y-10">
                {data?.years &&
                    <Dropdown
                        width={"min-w-44"}
                        placeholder={queryParams.yearMin}
                        options={data.years}
                        onSelect={(value) => handleQueryParamChange("yearMin", value)}
                    />}
                <div className='w-6 h-1 bg-white rounded glow'></div>
                {data?.years &&
                    <Dropdown
                        width={"min-w-44"}
                        placeholder={queryParams.yearMax}
                        options={data.years}
                        onSelect={(value) => handleQueryParamChange("yearMax", value)}
                    />}
            </div>
            <Dropdown
                placeholder={Object.entries(sortType).find(([key, val]) => val === queryParams.topicSorts)[0]}
                options={["Без сортировки", "По возрастанию года утверждения", "По убыванию года утверждения", "По алфавиту (от А до Я)", "По алфавиту (от Я до А)"]}
                onSelect={(value) => handleQueryParamChange("topicSorts", value)}
            />
        </div>
    );
}

export default ControllerSortings;
