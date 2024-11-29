import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { fetchImage } from "../../../axios/axiosApi";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import IMAGES from "../../../consts/Images";

const UserProfile = ({ dataTables }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    const { data } = useFetchData(fetchImage, dataTables?.users?.image);
    
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        let url = null;

        if (data) {
            url = URL.createObjectURL(data);
            setImageUrl(url);
        } else {
            setImageUrl(null);
        }

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [data, dataTables]);

    useEffect(() => {
        setImageUrl(null);
    }, [dataTables]);

    return (
        <div ref={elementRef} className={`trantion-all duration-500 flex w-full h-32 mb-10 flex-col items-center ${isVisible ? "" : "-translate-y-full opacity-0"}`}>
            <div className="flex items-center justify-center h-full">
                <div className="h-20 w-20 mb-2 rounded-full overflow-hidden shadow-personal">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Loaded from backend" className="h-full w-full object-cover" />
                    ) : (
                        <img src={IMAGES.NOT_FOUND_PERSONAL} alt="Loaded from backend" className="h-full w-full object-cover" />
                    )
                    } 
                </div>
            </div>
            <div className="flex flex-col text-gray-800 h-full justify-center items-center">
                <h1 className="font-bold text-lg">{dataTables?.users?.surname + " " + dataTables?.users?.name[0].toUpperCase() + "." + dataTables?.users?.fathername[0].toUpperCase() + "."}</h1>
                <h1 className="text-sm">{dataTables?.users?.role === "ADMIN" ? "Зав. Отделением" : "Преподаватель"}</h1>
            </div>
        </div>
    )
}

export default UserProfile;
