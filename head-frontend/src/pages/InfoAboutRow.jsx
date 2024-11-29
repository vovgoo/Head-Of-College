import React, { useCallback, useEffect, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { fetchInfoAboutRow } from "../axios/axiosApi";
import InitialBlock from "../components/InfoAboutRow/InitialBlock";
import TableInfoRow from "../components/InfoAboutRow/TableInfoRow"

const InfoAboutRow = () => {

    const { table, row } = useParams();

    const { isVisible, elementRef } = useIntersectionObserver();

    const [queryParams, setQueryParams] = useState({
        table: table,
        row: row
    });

    const { data } = useFetchData(fetchInfoAboutRow, queryParams);

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => {
            let newParams = { ...prev, [key]: value };
            return newParams;
        });
    }, []);

    useEffect(() => {
        handleQueryParamChange("table", table);
        handleQueryParamChange("row", row);
    }, [table, handleQueryParamChange, row])

    return (
        <div ref={elementRef} className="w-full glass h-dvh overflow-hidden p-5 max-2xl:mt-20">
            <div className={`pb-10 w-full h-full overflow-y-scroll overflow-x-hidden bg-white shadow-beautiful rounded-xl transition-all duration-500 ${isVisible ? "" : "translate-x-full opacity-0"}`}>
                {data?.rowInfo && <InitialBlock table={Object.keys(data?.rowInfo)[0]} data={data?.rowInfo[Object.keys(data?.rowInfo)[0]]} />}
                <div>
                    {data?.rowInfo && typeof data.rowInfo === 'object' && Object.entries(data?.rowInfo).slice(1).map(([key, value]) => {
                        if (value.fields?.length !== 0) {
                            return (
                                <TableInfoRow
                                    title={"Ассоциация с таблицей '" + key.replace("id_", "название ").replace(/_/g, " ").replace(key[0], (char) => char.toUpperCase()) + "'"}
                                    data={value}
                                    key={key} 
                                />
                            );
                        }
                        return null; 
                    })}
                </div>
            </div>
        </div>
    )
}

export default InfoAboutRow;
