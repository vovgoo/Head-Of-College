import React, { useEffect, useState } from 'react';
import TableSearch from './TableController/TableSearch';
import TablePagination from './TableController/TablePagination';

const TableController = ({ data, queryParams, handleQueryParamChange, table }) => {

    const [dictionary, setDictionary] = useState({});

    useEffect(() => {
        setDictionary({
            columns: [
                "Без сортировки",
                ...(data?.columns?.map((item) => 
                    item.columnName.startsWith('id')
                        ? 'Название ' + item.columnName.replace("id_", "")
                        : item.columnName.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())
                ) || [])
            ],

            types: [
                null,
                ...(data?.columns?.map((item) => 
                    item.columnType.startsWith('id')
                        ? 'Название ' + item.columnType.replace("id_", "")
                        : item.columnType.replace(/_/g, " ")
                ) || [])
            ]
        });

    }, [data])

    return (
        <div className="w-full h-20 mt-10 flex items-end font-bold justify-between max-xl:flex-col-reverse max-xl:items-center max-xl:h-auto">
            <TablePagination 
            data={data}
            queryParams={queryParams}
            handleQueryParamChange={handleQueryParamChange}
            />
            <TableSearch 
                table={table}
                dictionary={dictionary}
                queryParams={queryParams}
                handleQueryParamChange={handleQueryParamChange}
            />
        </div>
    );
};

export default TableController;
