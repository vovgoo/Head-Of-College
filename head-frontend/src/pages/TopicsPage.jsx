import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TopicSelectionHeader from '../components/TopicsPage/TopicSelectionHeader';
import TopicSearchBar from '../components/TopicsPage/TopicSearchBar';
import TopicList from '../components/TopicsPage/TopicList/TopicList';
import useFetchData from '../hooks/useFetchData'
import { fetchTopics } from '../axios/axiosApi';

const TopicsPage = () => {

    const [queryParams, setQueryParams] = useState({
        description: "",
        yearMin: null,
        yearMax: null,
        topicSorts: null,
        page: 0,
    });

    const { data } = useFetchData(fetchTopics, queryParams);

    const sortType = useMemo(() => ({
        "Без сортировки": null,
        "По возрастанию года утверждения": "yearsAsk",
        "По убыванию года утверждения": "yearsDesk",
        "По алфавиту (от А до Я)": "descriptionAsk",
        "По алфавиту (от Я до А)": "descriptionDesk"
    }), []);

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => {
            let newParams = { ...prev, [key]: value, page: key === "page" ? value : 0 };

            if (key === "yearMin" && value > prev.yearMax) {
                newParams.yearMax = value;
            } else if (key === "yearMax" && value < prev.yearMin) {
                newParams.yearMin = value;
            }

            if (key === "topicSorts") {
                newParams.topicSorts = sortType[value];
            }

            return newParams;
        });
    }, [sortType]);

    useEffect(() => {
        if (data && Array.isArray(data?.years) && data?.years.length > 0 && queryParams.yearMin === null && queryParams.yearMax === null) {
            handleQueryParamChange("yearMin", Math.min(...data.years));
            handleQueryParamChange("yearMax", Math.max(...data.years));
        }
    }, [handleQueryParamChange, data, queryParams.yearMin, queryParams.yearMax]);

    return (
        <div className={`w-full glass-black overflow-hidden min-h-dvh`}>
            <TopicSelectionHeader/>

            <TopicSearchBar
            value={queryParams.description}
            handleQueryParamChange={handleQueryParamChange}
            />

            <TopicList
            data={data}
            queryParams={queryParams}
            handleQueryParamChange={handleQueryParamChange}
            sortType={sortType}
            />
        </div>
    );
}

export default TopicsPage;
