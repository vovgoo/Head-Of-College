import React, { useCallback, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import IMAGES from "../consts/Images";
import { Pagination } from "@mui/material";
import { fetchAddArchive, fetchArchive } from "../axios/axiosApi";
import useFetchData from "../hooks/useFetchData";
import ArchiveComponent from "../components/Archive/ArchiveComponent";
import { useNotification } from "../context/NotificatIonContext";

const Archive = () => {

    const { isVisible, elementRef } = useIntersectionObserver();

    const [queryParams, setQueryParams] = useState({
        page: 0
    });

    const { data } = useFetchData(fetchArchive, queryParams);

    const { showNotification } = useNotification();

    const handleQueryParamChange = useCallback((key, value) => {
        setQueryParams((prev) => {
            let newParams = { ...prev, [key]: value };
            return newParams;
        });
    }, []);

    const handleAdd = async () => {
        try {
            await fetchAddArchive();
    
            showNotification({
                title: "Уведомление",
                message: "Архив успешно добавлен",
                type: "success" 
            });

            handleQueryParamChange("page", 0);
        } catch (error) {
            showNotification({
                title: "Ошибка",
                message: "Ошибка сервера, увы и ах.",
                type: "error" 
            });
        }
    }

    return (
        <div ref={elementRef} className="w-full h-dvh flex items-center py-5 glass justify-between overflow-hidden max-2xl:mt-20">
            <div className={`flex flex-col justify-between gap-y-5 w-full max-2xl:w-full mx-4 bg-white px-12 max-sm:px-5 py-8 overflow-y-scroll rounded-xl shadow-beautiful h-full duration-500 transition-all ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                <div className="flex flex-col">
                    <div className={`flex items-center gap-x-5 my-5`}>
                        <h1 className={`text-xl font-bold transition-all duration-500 max-sm:text-center max-sm:w-full ${isVisible ? "" : "-translate-y-full opacity-0"}`}>Панель архивации!</h1>
                        <img src={IMAGES.STATS_EMOJI} alt="" className={`max-sm:hidden h-10 transition-all duration-500 ${isVisible ? "" : "-translate-y-full opacity-0"}`} />
                    </div>

                    <div className="mt-10">
                        <Pagination
                            count={Math.ceil(data?.archiveList?.metadata.totalElements / data?.archiveList?.metadata.size)}
                            page={queryParams.page + 1}
                            siblingCount={0} 
                            boundaryCount={1}
                            onChange={(event, value) => handleQueryParamChange("page", value - 1)}
                            sx={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                                transition: 'opacity 1s ease, transform 1s ease',
                                '& .MuiPaginationItem-root': {
                                    color: 'black',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                    },
                                },
                                '& .MuiPaginationItem-page.Mui-selected': {
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                    },
                                },
                            }}
                        />
                        <div className='w-full relative'>
                            <div className={`w-table-gran h-table-gran absolute bg-gray-400 right-0 transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`} />
                            <div className={`w-table-gran h-table-gran absolute bg-gray-400 left-0 transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`} />
                            <div ref={elementRef} className='overflow-x-scroll overflow-y-hidden w-full h-full mb-10 mt-5'>
                                <table className={`min-w-full h-full border-2 border-gray-400 bg-white transition-all duration-1000 ${isVisible ? "" : "translate-y-full opacity-0"}`}>
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-500 font-bold h-14">
                                            <td className="w-10 border-2 border-gray-400 h-10 max-h-10 text-center font-bold">#</td>
                                            <td className="border-2 border-gray-400 h-10 max-h-10 px-3 text-center w-10">Дата архивации</td>
                                        </tr>
                                    </thead>
                                    <tbody className="border-2 border-gray-400">
                                        {data?.archiveList.content.map(item => {
                                            return <ArchiveComponent id={item.id} name={item.date}/>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div onClick={handleAdd} className="font-bold cursor-pointer px-10 py-5 h-12 max-lg:w-full rounded-xl border-2 border-green-500 flex gap-x-5 items-center justify-center group bg-green-500 text-white fill-white transition-all duration-300 hover:text-green-500 hover:bg-white">
                    <h1 className="text-center">Архивировать базу данных</h1>
                </div>



            </div>
        </div>
    )
}

export default Archive;
