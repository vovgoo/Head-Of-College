import { Pagination } from "@mui/material";
import React from "react";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";


const ControllerPagination = ({ data, queryParams, handleQueryParamChange }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className={`max-xl:pt-10 duration-1000 transition-all ${isVisible ? "opacity-100" : "-translate-x-full opacity-0"}`}>
            {data?.topicsOfDiplomaTheses && Math.ceil(data.topicsOfDiplomaTheses.metadata.totalElements / data.topicsOfDiplomaTheses.metadata.size) !== 0 &&
                <Pagination
                    count={Math.ceil(data.topicsOfDiplomaTheses.metadata.totalElements / data.topicsOfDiplomaTheses.metadata.size)}
                    page={queryParams.page + 1}
                    onChange={(event, value) => handleQueryParamChange("page", value - 1)}
                    sx={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'opacity 1s ease, transform 1s ease',
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        },
                        '& .MuiPaginationItem-page.Mui-selected': {
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        },
                        '& .MuiPagination-root': {
                            margin: 'auto',
                        },
                    }}
                />}
        </div>
    );
}

export default ControllerPagination;
