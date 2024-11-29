import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TablePage from "../pages/TablePage";
import ROUTES from "../consts/routes";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import NotFoundPage from "../pages/NotFoundPage";
import InsertPage from "../pages/InsertPage";
import InfoAboutRow from "../pages/InfoAboutRow";
import UpdatePage from "../pages/UpdatePage";
import BurgerMenuAdaptive from "../components/AdaptiveDashboardBurgerMenu/BurgerMenuAdaptive";
import Archive from "../pages/Archive";

const PageWithBurgerMenu = ({ element }) => {
    return (
        <div className="w-full flex">
            <BurgerMenu />
            {element}
        </div>
    );
};

const AdminRoutes = () => {
    return (
        <div className={`w-full h-full overflow-hidden relative`}>
            <BurgerMenuAdaptive/>
            <Routes>
                <Route path={ROUTES.DASHBOARD} element={<PageWithBurgerMenu element={<Dashboard />}/>} />
                <Route path={ROUTES.TABLES} element={<PageWithBurgerMenu element={<TablePage />}/>}/>
                <Route path={ROUTES.TABLES_INSERT} element={<PageWithBurgerMenu element={<InsertPage />}/>}/>
                <Route path={ROUTES.TABLES_UPDATE} element={<PageWithBurgerMenu element={<UpdatePage />}/>}/>
                <Route path={ROUTES.INFO_ABOUT_ROW} element={<PageWithBurgerMenu element={<InfoAboutRow />}/>}/>
                <Route path={ROUTES.ARCHIVE} element={<PageWithBurgerMenu element={<Archive />}/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default AdminRoutes;
