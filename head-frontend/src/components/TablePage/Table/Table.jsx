import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import Settings from './Settings';
import TableCellImage from './TableCellImage';

const Table = ({ data, table, updatePage }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        setOpenMenu(null);
    }, [data]);

    const toggleMenu = (id) => {
        setOpenMenu(prevId => (prevId === id ? null : id));
    };

    const UserRole = {
        "ADMIN": "Зав. Отделением",
        "TEACHER": "Преподаватель"
    }

    return (
        <div className='w-full relative'>
            <div className={`w-table-gran h-table-gran absolute bg-gray-400 right-0 transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`} />
            <div className={`w-table-gran h-table-gran absolute bg-gray-400 left-0 transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`} />
            <div ref={elementRef} className='overflow-x-scroll overflow-y-hidden w-full h-full mb-10 mt-5'>
                <table className={`min-w-full h-full border-2 border-gray-400 bg-white transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                    <thead>
                        <tr className="bg-gray-200 text-gray-500 font-bold h-14">
                            <td className="border-2 border-gray-400 h-10 max-h-10 text-center font-bold w-first-column">#</td>
                            {data?.columns.map((item) => (
                                <td className="border-2 border-gray-400 h-10 max-h-10 px-5 text-center">{item.columnName.replace("id_", "Название ").replace(/_/g, " ").replace(item.columnName[0], (char) => char.toUpperCase())}</td>
                            ))}
                            <td className="border-2 border-gray-400 h-10 max-h-10 px-3 text-center w-10">Настройки</td>
                        </tr>
                    </thead>
                    <tbody className="border-2 border-gray-400">
                        {data?.tableData?.content.map((item, rowIndex) => (
                            <tr className='transition-all duration-100 hover:bg-cyan-100 cursor-pointer' key={rowIndex}>
                                <td className="border-2 border-gray-400 h-10 max-h-10 px-5 text-center font-bold">
                                    <Link to={`/admin/tables/${data?.tableName}/${Object.entries(item).length > 0 ? Object.entries(item)[0][1] : -1}`} className='items-center justify-center flex w-full h-full'>
                                        {item && typeof item === 'object' && Object.entries(item).length > 0 ? Object.entries(item)[0][1] : 'N/A'}
                                    </Link>
                                </td>
                                {item && typeof item === 'object' && Object.entries(item).length > 0 && Object.entries(item).slice(1).map(([key, value], colIndex) => (
                                    <td key={key} className="border-2 px-5 border-gray-400 h-10 max-h-10 text-center">
                                        <Link to={`/admin/tables/${data?.tableName}/${Object.entries(item).length > 0 ? Object.entries(item)[0][1] : -1}`} className='items-center justify-center flex w-full h-full'>
                                            {data.columns && data.columns[colIndex] ? (
                                                Object.entries(data.columns[colIndex])[0][1].startsWith("Фото") ? (
                                                    <TableCellImage value={value} />
                                                ) : Object.entries(data.columns[colIndex])[0][1].startsWith("Роль") ? (
                                                    <h1 className='font-bold'>{UserRole[value]}</h1>
                                                ) : (
                                                    /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]+)?(?:Z|([+-])([0-9]{2}):([0-9]{2}))?$/.test(value) ? (
                                                        <span>{new Date(value).toLocaleDateString('ru-RU')}</span>
                                                    ) : typeof value === 'object' && value ? (
                                                        key === "students" ? (
                                                            <Link to={`/admin/tables/студенты/${item["id"]}`} className="text-blue-500 font-bold">
                                                                {value.surname + " " + value.name + " " + value.fathername}
                                                            </Link>
                                                        ) : (
                                                            key === "group" ? (
                                                                <Link to={`/admin/tables/группы/${item["id"]}`} className="text-blue-500 font-bold">
                                                                    {value.name}
                                                                </Link>
                                                            ) : (
                                                                <Link to={`/admin/tables/специальности/${item["id"]}`} className="text-blue-500 font-bold">
                                                                    {value.name}
                                                                </Link>
                                                            )
                                                        )
                                                    ) : (
                                                        value !== undefined && value !== null ? value : 'N/A'
                                                    )
                                                )
                                            ) : null}
                                        </Link>
                                    </td>
                                ))}

                                <td className="border-2 px-5 border-gray-400 h-10 max-h-10 z-50">
                                    <Settings updatePage={updatePage} isOpen={openMenu === rowIndex} onToggle={toggleMenu} id={rowIndex} table={table} row={`${Object.entries(item).length > 0 ? Object.entries(item)[0][1] : -1}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
