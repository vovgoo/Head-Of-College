import React from "react";

const TableComponent = ({ description, year }) => {

    return (
        <tr className='max-h-32 border-purple-950 border-b-2 group cursor-pointer -translate-x-1/2 opacity-50 table-row'>
            <td className="relative border-r-2 border-purple-950 w-2/3 px-2 text-white font-bold tracking-widest text-base py-5">
                <div className='w-full h-full bg-white absolute duration-100 transition-all z-0 top-0 left-0 opacity-0 group-hover:opacity-15' />
                {description}
            </td>
            <td className="relative w-1/3 text-center text-white font-bold tracking-widest text-base py-5">
                <div className='w-full h-full bg-white absolute duration-100 transition-all z-0 top-0 left-0 opacity-0 group-hover:opacity-15' />
                {year}
            </td>
        </tr>
    );
}

export default TableComponent;
