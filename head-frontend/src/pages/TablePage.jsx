import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchTable } from "../axios/axiosApi";
import useFetchData from "../hooks/useFetchData";
import StatsSection from "../components/TablePage/StatsSection/StatsSection";
import Table from "../components/TablePage/Table/Table";
import TableController from "../components/TablePage/Table/TableController";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const TablePage = () => {

    const { table } = useParams();
    const { logout } = useAuth();

    const [redirectToHome, setRedirectToHome] = useState(false);

    const [queryParams, setQueryParams] = useState({
        table: table,
        search: "",
        sort: null,
        page: 0,
    });

    const { error, data } = useFetchData(fetchTable, queryParams);

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => {
            let newParams = { ...prev, [key]: value, page: key === "page" ? value : 0 };
            return newParams;
        });
    }, []);

    useEffect(() => {
        handleQueryParamChange("sort", null);
        handleQueryParamChange("search", "");
        handleQueryParamChange("page", 0);
        handleQueryParamChange("table", table);
    }, [table, handleQueryParamChange])

    const updatePage = () => {
        handleQueryParamChange("page", queryParams["page"])
    }
    
    useEffect(() => {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            logout();
            setRedirectToHome(true);
        }
    }, [error, logout])

    if (redirectToHome) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="w-full overflow-hidden h-dvh glass max-2xl:h-full max-2xl:z-0 max-2xl:mt-20">
            <div className="w-full h-full overflow-y-scroll px-16 max-md:px-5 overflow-x-hidden">
                <StatsSection data={data} table={table}/>

                <TableController 
                    table={table}
                    data={data}
                    queryParams={queryParams}
                    handleQueryParamChange={handleQueryParamChange}
                />

                <Table data={data} table={table} updatePage={updatePage}/>
            </div>
        </div>
    )
}

export default TablePage;
