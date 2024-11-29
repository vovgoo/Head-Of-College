import React, { useEffect, useState } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import { fetchImage } from '../../../axios/axiosApi';
import IMAGES from '../../../consts/Images';

const TableCellImage = ({ value }) => {

    const { data } = useFetchData(fetchImage, value);
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
    }, [data, value]);

    useEffect(() => {
        setImageUrl(null);
    }, [value]);

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='h-20 w-20 rounded-full shadow-beautiful m-5 overflow-hidden'>
                {imageUrl ? (
                    <img className='h-full w-full object-cover' src={imageUrl} alt="user" />
                ) : (
                    <img className='h-full w-full object-cover' src={IMAGES.NOT_FOUND_PERSONAL} alt="user" />
                )}
            </div>
        </div>
    );
};

export default TableCellImage;
