import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TableCellImage from '../TablePage/Table/TableCellImage';

const InfoAboutRow = ({ title, data }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    const UserRole = {
        "ADMIN": "Зав. Отделением",
        "TEACHER": "Преподаватель"
    }

    return (
        <div className='w-full' ref={elementRef}>
            <div className={`w-full px-10 py-8 duration-700 transition-all ${isVisible ? "" : "translate-x-full"}`}>
                <h1 className='text-xl font-bold tracking-wide w-full text-center'>{title}</h1>
            </div>
            <div className={`w-full px-10 transition-all duration-700 ${isVisible ? "" : "translate-x-full opacity-0"}`}>
                <div className={`w-full relative`}>
                    <div className='w-table-gran h-table-gran absolute bg-gray-400 right-0' />
                    <div className='w-table-gran h-table-gran absolute bg-gray-400 left-0' />
                    <div className='overflow-x-scroll w-full h-full'>
                        <table className={`min-w-max h-full w-full border-2 border-gray-400`}>
                            <thead>
                                <tr className="bg-gray-200 text-gray-500 font-bold h-14">
                                    <td className="border-2 border-gray-400 h-10 max-h-10 text-center font-bold w-first-column">#</td>
                                    {data?.types?.map((item) => (
                                        <td className="border-2 border-gray-400 h-10 max-h-10 px-3 text-center">{item.columnName.replace("id_", "Название ").replace(/_/g, " ").replace(item.columnName[0], (char) => char.toUpperCase())}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="border-2 border-gray-400">
                                {data?.fields?.map((item, rowIndex) => (
                                    <tr className='' key={rowIndex}>
                                        <td className="border-2 border-gray-400 h-10 max-h-10 px-5 text-center font-bold">
                                            {item && typeof item === 'object' && Object.entries(item).length > 0 ? Object.entries(item)[0][1] : 'N/A'}
                                        </td>
                                        {item && typeof item === 'object' && Object.entries(item).length > 0 && Object.entries(item).slice(1).map(([key, value], colIndex) => (
                                            <td key={key} className="px-5 border-2 border-gray-400 h-10 max-h-10 text-center">
                                                {Object.entries(data?.types[colIndex])[0][1].startsWith("Фото") ? (
                                                    <TableCellImage value={value} />
                                                ) : Object.entries(data?.types[colIndex])[0][1].startsWith("Роль") ? (
                                                    <h1 className='font-bold'>{UserRole[value]}</h1>
                                                ) : (
                                                    /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]+)?(?:Z|([+-])([0-9]{2}):([0-9]{2}))?$/.test(value) ? (
                                                        <span>{new Date(value).toLocaleDateString('ru-RU')}</span>
                                                    ) : typeof value === 'object' && value ? (
                                                        key === "students" ? (
                                                            <h1>{value.surname + " " + value.name + " " + value.fathername}</h1>
                                                        ) : (
                                                            <h1>{value.name}</h1>
                                                        )
                                                    ) : (
                                                        value !== undefined && value !== null ? value : 'N/A'
                                                    )
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoAboutRow;
