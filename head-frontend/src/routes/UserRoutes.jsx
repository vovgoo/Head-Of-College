import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../consts/routes";
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage";
import TopicsPage from "../pages/TopicsPage";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer/Footer";
import IMAGES from "../consts/Images";
import NotFoundPage from "../pages/NotFoundPage";
import BurgerMenu from "../components/Header/Sections/BurgerMenu";

const PageWithFooter = ({ element }) => {
    return (
        <div className="w-full h-full flex flex-col">
            {element}
            <Footer />
        </div>
    );
};

const PageWithHeader = ({ element, className }) => {
    return (
        <div className="w-full">
            <Header className={className}/>
            {element}
        </div>
    );
};

const UserRoutes = () => {
    return (
        <div className={`w-full h-full flex flex-col`}>
            <img src={IMAGES.GIF_BACKGROUND} className="fixed w-full opacity-15" alt="" />
            <BurgerMenu/>
            <Routes>
                <Route path={ROUTES.HOME} element={<PageWithHeader className={"glass-black"} element={<PageWithFooter element={<HomePage />} />}/> } />
                <Route path={ROUTES.TOPICS} element={<PageWithHeader className={"glass-black"} element={<PageWithFooter element={<TopicsPage />} />}/>} /> 
                <Route path={ROUTES.LOGIN} element={<PageWithHeader className={"fixed"} element={<LoginPage/>}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default UserRoutes;
