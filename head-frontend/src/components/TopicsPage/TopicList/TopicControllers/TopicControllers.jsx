import React from "react";
import ControllerPagination from "./ControllerPagination";
import ControllerSortings from "./ControllerSortings";

const TopicControllers = ({data, queryParams, handleQueryParamChange, sortType}) => {

    return (
        <div className='w-full flex justify-between items-center mb-5 max-xl:flex-col-reverse'>
            <ControllerPagination
                data={data}
                queryParams={queryParams}
                handleQueryParamChange={handleQueryParamChange}
            />
            <ControllerSortings
                data={data}
                queryParams={queryParams}
                handleQueryParamChange={handleQueryParamChange}
                sortType={sortType}
            />
        </div>
    );
}

export default TopicControllers;
