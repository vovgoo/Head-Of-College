import React from 'react'
import TopicTable from './TopicTable/TopicTable';
import TopicControllers from './TopicControllers/TopicControllers';

const TopicList = ({data, queryParams, handleQueryParamChange, sortType}) => {
    return (
        <div className={`w-full px-32 max-xl:px-20 max-md:px-10 max-sm:px-5 mt-32 max-lg:mt-16 h-full`}>
            {data && 
            <TopicControllers
                data={data}
                queryParams={queryParams}
                handleQueryParamChange={handleQueryParamChange}
                sortType={sortType}
            />
            }
            {data?.topicsOfDiplomaTheses?.content && 
            <TopicTable rows={data.topicsOfDiplomaTheses.content} />}
        </div>
    );
}

export default TopicList;
