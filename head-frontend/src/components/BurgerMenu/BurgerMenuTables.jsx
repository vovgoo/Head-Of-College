import React from "react";
import Table from "./BurgerMenuComponents/Table";
import useVisibleRows from "../../hooks/useVisibleRows";

const BurgerMenuTables = ({data, users}) => {

    const visibleRows = useVisibleRows(data);

    return (
        <div className="w-full font-bold text-sm text-gray-600 pr-4 h-full overflow-y-scroll">
            <Table index={0} name={"Главная страница"} link={"/admin/dashboard"} />
            {users?.role && users.role === "ADMIN" && <Table index={10} name={"Архив"} link={"/admin/archive"}/>}
            {data.map((row, index) => (
                visibleRows.includes(index) && (
                    <Table
                        key={index}
                        index={index + 1}
                        name={`${row.replace(/_/g, ' ').replace(row[0], char => char.toUpperCase())}`}
                        link={`/admin/tables/${row}`}
                    />
                )
            ))}            
        </div>
    )
}

export default BurgerMenuTables;
