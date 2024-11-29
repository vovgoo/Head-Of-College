import React from "react";
import { fetchGetArchive } from "../../axios/axiosApi";

const ArchiveComponent = ({id, name}) => {

    const handleClick = async () => {
        const response = await fetchGetArchive({ id });

        const blob = new Blob([response], { type: 'application/zip' });
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', `${name}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileURL);
        console.log(response);
    }   

    return (
        <tr className='hover:bg-cyan-100 cursor-pointer'>
            <td className="border-2 border-gray-400 h-10 max-h-10 px-5 text-center font-bold">
                {id}
            </td>
            <td onClick={handleClick} className="border-2 border-gray-400 h-10 max-h-10 px-5 text-center font-bold text-blue-500 transition-all duration-300 hover:text-blue-400">
                {name}
            </td>                           
        </tr>
    )
}

export default ArchiveComponent;
