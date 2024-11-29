import React from 'react';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import { Pagination } from '@mui/material';

const TablePagination = ({ data, queryParams, handleQueryParamChange }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className='max-xl:mt-5'>
            {data?.tableData && Math.ceil(data.tableData.metadata.totalElements / data.tableData.metadata.size) !== 0 &&
                <Pagination
                    count={Math.ceil(data.tableData.metadata.totalElements / data.tableData.metadata.size)}
                    page={queryParams.page + 1}
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
                        '& .MuiPagination-root': {
                            margin: 'auto',
                        },
                    }}
                />
            }
        </div>
    );
};

export default TablePagination;
