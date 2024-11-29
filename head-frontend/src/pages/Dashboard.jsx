import React, { useEffect, useState } from "react";
import CalendarDashboard from "../components/Dashboard/MainPage/CalendarDashboard";
import TimeDashboard from "../components/Dashboard/MainPage/TimeDashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Notes from "../components/Dashboard/Notes/Notes";
import Stats from "../components/Dashboard/Stats/Stats";
import Groups from "../components/Dashboard/Groups/Groups";
import IMAGES from "../consts/Images";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useFetchData from "../hooks/useFetchData";
import { fetchDashboard } from "../axios/axiosApi";
import axios from "axios";

const Dashboard = () => {

    const { error, data } = useFetchData(fetchDashboard);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const { logout } = useAuth();

    const { isVisible, elementRef } = useIntersectionObserver();

    useEffect(() => {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            logout();
            setRedirectToHome(true);
        }
    }, [error, logout])

    if (redirectToHome) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex w-full glass max-2xl:-z-10 max-2xl:mt-20" ref={elementRef}>
            <div className="flex flex-col min-h-dvh w-9/12 max-2xl:w-full px-16 max-sm:px-5 max-2xl:h-full overflow-y-scroll h-dvh overflow-hidden">

                <div className={`max-2xl:flex max-2xl:justify-center w-full transition-all duration-300 ${isVisible ? "transate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                    <div className="text-xl font-bold h-32 flex items-center">
                        <h1 className="max-sm:w-full max-sm:text-center" >Здравствуйте, {data && data.users && data.users.name + " " + data.users.fathername}!</h1>
                        <img src={`${IMAGES.HELLO_HAND}`} alt="" className="h-8 w-8 ml-2 max-sm:hidden" />
                    </div>
                </div>

                <div className="w-full flex justify-between gap-x-10 max-lg:grid max-lg:grid-cols-1 max-lg:gap-y-10">
                    <TimeDashboard isVisible={isVisible} />
                    <CalendarDashboard isVisible={isVisible} />
                </div>

                <Stats data={data} />
                <Groups data={data}/>
            </div>
            <Notes className={"w-3/12 max-2xl:hidden"} userData={data}/>
        </div>
    )
}

export default Dashboard;
